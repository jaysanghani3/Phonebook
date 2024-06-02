import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../../utils/globalStyles';
import styles from './styles';
import Icons from '../../assets';
import Strings from '../../translations/Strings';
import {InputModeOptions} from 'react-native/Libraries/Components/TextInput/TextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker/src/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteStackParamsList} from '../../navigators/AppNavigators';
import {Routes} from '../../navigators/routes';
import {
  createContact,
  updateContact,
  deleteContact,
  createContactOffline,
  updateContactOffline,
} from '../../services/firestore';
import {isMobileNumberValid, isNameValid} from '../../utils/validations';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../../components/Loader';

type PhonebookProps = NativeStackScreenProps<
  RouteStackParamsList,
  Routes.Phonebook
>;

type IFields = {
  title: string;
  value: string;
  placeholder: string;
  inputType: InputModeOptions;
  errorMsg: string;
}[];
interface IContactDetails {
  firstNameValue: string;
  lastNameValue: string;
  phoneNumberValue: string;
  mobileNumberValue: string;
  workNumberValue: string;
  homeNumberValue: string;
  imageValue: string | undefined;
}
interface IError {
  firstNameValue?: string;
  lastNameValue?: string;
  phoneNumberValue?: string;
  mobileNumberValue?: string;
  workNumberValue?: string;
  homeNumberValue?: string;
}
const Phonebook = ({navigation, route}: PhonebookProps) => {
  const {
    id,
    firstNameValue,
    lastNameValue,
    phoneNumberValue,
    mobileNumberValue,
    workNumberValue,
    homeNumberValue,
    imageValue,
  } = route.params;

  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    firstNameValue: firstNameValue || '',
    lastNameValue: lastNameValue || '',
    phoneNumberValue: phoneNumberValue || '',
    mobileNumberValue: mobileNumberValue || '',
    workNumberValue: workNumberValue || '',
    homeNumberValue: homeNumberValue || '',
    imageValue: imageValue || '',
  });
  const Fields: IFields = [
    {
      title: 'firstNameValue',
      value: contactDetails.firstNameValue,
      placeholder: Strings.fnamePlaceholder,
      inputType: 'text',
      errorMsg: Strings.required,
    },
    {
      title: 'lastNameValue',
      value: contactDetails.lastNameValue,
      placeholder: Strings.lnamePlaceholder,
      inputType: 'text',
      errorMsg: Strings.required,
    },
    {
      title: 'phoneNumberValue',
      value: contactDetails.phoneNumberValue,
      placeholder: Strings.phonePlaceholder,
      inputType: 'tel',
      errorMsg: Strings.required,
    },
    {
      title: 'mobileNumberValue',
      value: contactDetails.mobileNumberValue,
      placeholder: Strings.mobilePlaceholder,
      inputType: 'tel',
      errorMsg: Strings.required,
    },
    {
      title: 'workNumberValue',
      value: contactDetails.workNumberValue,
      placeholder: Strings.workPlaceholder,
      inputType: 'tel',
      errorMsg: Strings.required,
    },
    {
      title: 'homeNumberValue',
      value: contactDetails.homeNumberValue,
      placeholder: Strings.homePlaceholder,
      inputType: 'tel',
      errorMsg: Strings.required,
    },
  ];
  const [error, setError] = useState<IError>({
    firstNameValue: '',
    lastNameValue: '',
    phoneNumberValue: '',
    mobileNumberValue: '',
    workNumberValue: '',
    homeNumberValue: '',
  });
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      return setIsConnected(state.isConnected ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAdd = async () => {
    Keyboard.dismiss();
    if (!contactDetails.firstNameValue || !contactDetails.phoneNumberValue) {
      setError({
        ...error,
        firstNameValue: !contactDetails.firstNameValue ? Strings.required : '',
        phoneNumberValue: !contactDetails.phoneNumberValue
          ? Strings.required
          : '',
      });
      return;
    }
    if (!isNameValid(contactDetails.firstNameValue)) {
      setError({
        firstNameValue: Strings.invalidName,
      });
      return;
    }
    if (contactDetails.lastNameValue) {
      if (!isNameValid(contactDetails.lastNameValue)) {
        setError({
          lastNameValue: Strings.invalidName,
        });
        return;
      }
    }
    if (!isMobileNumberValid(contactDetails.phoneNumberValue)) {
      setError({phoneNumberValue: Strings.invalidPhone});
      return;
    }
    if (contactDetails.mobileNumberValue) {
      if (!isMobileNumberValid(contactDetails.mobileNumberValue)) {
        setError({mobileNumberValue: Strings.invalidPhone});
        return;
      }
    }
    if (contactDetails.workNumberValue) {
      if (!isMobileNumberValid(contactDetails.workNumberValue)) {
        setError({workNumberValue: Strings.invalidPhone});
        return;
      }
    }
    if (contactDetails.homeNumberValue) {
      if (!isMobileNumberValid(contactDetails.homeNumberValue)) {
        setError({homeNumberValue: Strings.invalidPhone});
        return;
      }
    }

    setError({
      firstNameValue: '',
      lastNameValue: '',
      phoneNumberValue: '',
      mobileNumberValue: '',
      workNumberValue: '',
      homeNumberValue: '',
    });
    setLoading(true);
    if (!id) {
      if (!isConnected) {
        createContactOffline(contactDetails, contactDetails.imageValue ?? '');
      } else {
        await createContact(contactDetails, contactDetails.imageValue ?? '');
      }
    } else {
      if (!isConnected) {
        updateContactOffline(
          id,
          contactDetails,
          contactDetails.imageValue ?? '',
        );
      } else {
        updateContact(id, contactDetails, contactDetails.imageValue ?? '');
      }
    }
    navigation.goBack();
  };

  const handleGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        console.log('imageUri', imageUri);
        setContactDetails({...contactDetails, imageValue: imageUri});
      }
    });
  };

  const handleCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      saveToPhotos: true,
    };

    const result = await launchCamera(options);
    const imageUri = result.assets?.[0]?.uri;
    setContactDetails({...contactDetails, imageValue: imageUri});
  };

  const handleDelete = () => {
    setModalVisible(!modalVisible);
    deleteContact(id);
    navigation.goBack();
  };

  return (
    <View style={globalStyles.flex1}>
      <Loader state={loading} />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerBtn} onPress={handleCancel}>
          <Text style={styles.headerText}>{Strings.cancelBtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={handleAdd}>
          <Text style={styles.headerText}>
            {!id ? Strings.add : Strings.update}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.profileImgContainer}>
          <Image
            source={
              contactDetails.imageValue
                ? {uri: contactDetails?.imageValue}
                : Icons.profile
            }
            style={styles.profileImg}
          />
          <View style={styles.imgBtnContainer}>
            <TouchableOpacity onPress={handleGallery} style={styles.imgBtn}>
              <Image source={Icons.gallery} style={styles.imgSize} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCamera} style={styles.imgBtn}>
              <Image source={Icons.camera} style={styles.imgSize} />
            </TouchableOpacity>
          </View>
        </View>
        {Fields.map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              value={field.value}
              onChangeText={newValue => {
                setContactDetails({...contactDetails, [field.title]: newValue});
              }}
              style={styles.textArea}
              placeholder={field.placeholder}
              inputMode={field.inputType}
            />
            <Text style={globalStyles.error}>
              {error[field.title as keyof typeof error]}
            </Text>
          </View>
        ))}
        {id && (
          <View style={styles.delContainer}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => setModalVisible(true)}>
              <Image source={Icons.delete} style={styles.delImgSize} />
              <Text style={styles.deleteBtnText}>{Strings.delete}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modelContainer}>
            <View style={styles.modalView}>
              <Text style={styles.dltTitle}>{Strings.dltMsg}</Text>
              <View style={styles.delBtnContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btnWidth}>
                  <Text>{Strings.cancel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.delBtn}>
                  <Text style={styles.btnText}>{Strings.yes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Phonebook;
