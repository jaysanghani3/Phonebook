import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import globalStyles from '../../utils/globalStyles';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import styles from './styles';
import Icons from '../../assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteStackParamsList} from '../../navigators/AppNavigators';
import {Routes} from '../../navigators/routes';
import Loader from '../../components/Loader';
import Strings from '../../translations/Strings';
import {
  contactDocRef,
  likeContact,
  userDocRef,
  likeContactOffline,
} from '../../services/firestore';
import {AlphabetList} from 'react-native-section-alphabet-list';
import Colors from '../../utils/Colors';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = NativeStackScreenProps<
  RouteStackParamsList,
  Routes.HomeScreen
>;

type TData = {
  value: string;
  key: string;
  img: string;
  phone: string;
  home: string;
  work: string;
  mobile: string;
  isLiked: boolean;
}[];

type IContact = {
  id: string;
  imageValue: string;
  firstNameValue: string;
  lastNameValue: string;
  phoneValue: string;
  mobileValue: string;
  homeValue: string;
  workValue: string;
  isLiked: boolean;
}[];

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<IContact>([]);
  const [searchValue, setSearchValue] = useState('');
  const [section, setSection] = useState<TData>([]);
  const alphabetArray = Array.from({length: 26}, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const [indexArray, setIndexArray] = useState(alphabetArray);
  const [sortType, setSortType] = useState('asc');
  const [isConnected, setIsConnected] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const handleAdd = () => {
    navigation.navigate(Routes.Phonebook, {
      id: '',
      firstNameValue: '',
      lastNameValue: '',
      imageValue: '',
      phoneNumberValue: '',
      mobileNumberValue: '',
      workNumberValue: '',
      homeNumberValue: '',
    });
  };
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await auth().signOut();
      setIsLoading(false);
      navigation.dispatch(StackActions.replace(Routes.LoginScreen));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      return setIsConnected(state?.isConnected ?? false);
    });
    userIDOffline();
    getContacts();
    return () => unsubscribe();
  }, []);
  const userIDOffline = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(auth().currentUser?.uid));
  };
  useEffect(() => {
    userIDOffline();
    if (!isConnected) {
      localContacts();
    } else {
      handleLike('');
      getContacts();
    }
  }, [isConnected]);
  useEffect(() => {
    const subscriber = navigation.addListener('focus', () => {
      getContacts();
      localContacts();
    });
    return () => subscriber();
  }, [navigation]);
  const localContacts = async () => {
    try {
      const unsubscribe = contactDocRef()?.onSnapshot(async snapshot => {
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        getContacts();
      });
      return () => unsubscribe && unsubscribe();
    } catch (e) {
      console.log(e);
    }
  };
  const getContacts = async () => {
    try {
      const userDocRefInstance = userDocRef();
      if (userDocRefInstance) {
        setIsLoading(true);
        const contactsDoc = await userDocRefInstance
          .collection('contacts')
          .orderBy('firstNameValue', 'asc')
          .get();

        const contactsData: IContact = contactsDoc.docs.map(doc => ({
          id: doc.id,
          imageValue: doc.data().storageUrl || doc.data().imageValue,
          firstNameValue: doc.data().firstNameValue,
          lastNameValue: doc.data().lastNameValue,
          phoneValue: doc.data()?.phoneNumberValue,
          mobileValue: doc.data()?.mobileNumberValue,
          homeValue: doc.data()?.homeNumberValue,
          workValue: doc.data()?.workNumberValue,
          isLiked: doc.data().isLiked,
        }));
        setContacts(contactsData);
        if (contactsData.length > 0) {
          const data = contactsData.map(item => ({
            key: item.id,
            img: item.imageValue,
            value: item.firstNameValue + ' ' + item.lastNameValue,
            phone: item.phoneValue,
            home: item.homeValue,
            work: item.workValue,
            mobile: item.mobileValue,
            isLiked: item.isLiked,
          }));
          setSection(data);
          setIndexArray(alphabetArray);
          setSortType('asc');
        }
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (sortType === Strings.asc) {
      handleAscSort();
    } else if (sortType === Strings.desc) {
      handleDescSort();
    }
  }, [sortType]);
  const handleAscSort = () => {
    const data = contacts.sort((a, b) => {
      if (a.firstNameValue < b.firstNameValue) {
        return -1;
      }
      if (a.firstNameValue > b.firstNameValue) {
        return 1;
      }
      return 0;
    });

    const sectionData = data.map(item => ({
      key: item.id,
      img: item.imageValue,
      value: item.firstNameValue + ' ' + item.lastNameValue,
      phone: item.phoneValue,
      home: item.homeValue,
      work: item.workValue,
      mobile: item.mobileValue,
    }));
    setSection(sectionData);
    setIndexArray(alphabetArray);
    setSortType('asc');
  };
  const handleDescSort = () => {
    const data = contacts.sort((a, b) => {
      if (a.firstNameValue < b.firstNameValue) {
        return 1;
      }
      if (a.firstNameValue > b.firstNameValue) {
        return -1;
      }
      return 0;
    });

    const sectionData = data.map(item => ({
      key: item.id,
      img: item.imageValue,
      value: item.firstNameValue + ' ' + item.lastNameValue,
      phone: item.phoneValue,
      home: item.homeValue,
      work: item.workValue,
      mobile: item.mobileValue,
    }));
    setSection(sectionData);
    setIndexArray(alphabetArray.reverse());
    setSortType('desc');
  };
  const handleViewContact = (
    id: string,
    name: string,
    img: string | undefined,
    phone: string,
    home: string,
    work: string,
    mobile: string,
  ) => {
    navigation.navigate(Routes.Phonebook, {
      id,
      firstNameValue: name.split(' ')[0],
      lastNameValue: name.split(' ')[1],
      imageValue: img,
      phoneNumberValue: phone,
      homeNumberValue: home,
      workNumberValue: work,
      mobileNumberValue: mobile,
    });
  };
  const handleSearch = (text: string) => {
    setSearchValue(text);
    const data = contacts.filter(
      item =>
        item.firstNameValue.toLowerCase().includes(text.toLowerCase()) ||
        item.lastNameValue.toLowerCase().includes(text.toLowerCase()),
    );

    const sectionData = data.map(item => ({
      key: item.id,
      img: item.imageValue,
      value: item.firstNameValue + ' ' + item.lastNameValue,
      phone: item.phoneValue,
      home: item.homeValue,
      work: item.workValue,
      mobile: item.mobileValue,
      isLiked: item.isLiked,
    }));
    setSection(sectionData);
  };
  const handleLike = async (id: string) => {
    try {
      if (!isConnected) {
        likeContactOffline(id);
      } else {
        likeContact(id);
        getContacts();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMoreOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  const handleScreenPress = () => {
    setOptionsVisible(false);
  };
  return (
    <Pressable style={styles.flex1} onPress={handleScreenPress}>
      <Loader state={isLoading} />

      <View style={globalStyles.navbar}>
        <TextInput
          placeholder={Strings.searchPlaceholder}
          placeholderTextColor={Colors.appColor}
          style={styles.searchInput}
          defaultValue={searchValue}
          onChangeText={text => handleSearch(text)}
        />

        <TouchableOpacity style={styles.more} onPress={handleMoreOptions}>
          <Image source={Icons.more} style={styles.iconSize} />
        </TouchableOpacity>
      </View>
      {optionsVisible && (
        <View style={styles.optionsContainer}>
          <View style={styles.optionBtn}>
            <Image source={Icons.user} style={styles.actionBtn} />
            <Text style={styles.optionText}>Jay</Text>
          </View>
          {sortType === Strings.desc ? (
            <TouchableOpacity style={styles.optionBtn} onPress={handleAscSort}>
              <Image source={Icons.sort_asc} style={styles.actionBtn} />
              <Text style={styles.optionText}>{Strings.aTOz}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.optionBtn} onPress={handleDescSort}>
              <Image style={styles.iconSize} source={Icons.sort_desc} />
              <Text style={styles.optionText}>{Strings.zTOa}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.optionBtn}>
            <Image source={Icons.logout} style={styles.actionBtn} />
            <Text style={styles.optionText}>{Strings.logoutBtn}</Text>
          </TouchableOpacity>
        </View>
      )}
      {contacts.length === 0 ? (
        <View style={globalStyles.flexCenter}>
          <Text>{Strings.noContacts}</Text>
        </View>
      ) : section.length > 0 ? (
        <AlphabetList
          index={indexArray}
          showsVerticalScrollIndicator={false}
          style={styles.noteStyle}
          data={section}
          renderCustomItem={abc => {
            const item = abc as TData[number];
            return (
              <TouchableOpacity
                onPress={() =>
                  handleViewContact(
                    item.key,
                    item.value,
                    item.img,
                    item.phone,
                    item.home,
                    item.work,
                    item.mobile,
                  )
                }
                style={styles.note}>
                <View>
                  <Image
                    source={item?.img ? {uri: item?.img} : Icons.profile}
                    style={styles.likeIcon}
                  />
                </View>
                <View style={styles.noteTitleContainer}>
                  <Text style={styles.noteTitle}>{item?.value}</Text>
                </View>

                <View style={styles.contactLikeIcon}>
                  <TouchableOpacity onPress={() => handleLike(item.key)}>
                    <Image
                      source={item.isLiked ? Icons.fill : Icons.outline}
                      style={styles.iconSize}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          renderCustomSectionHeader={sec => (
            <ScrollView>
              <Text style={styles.header}>{sec.title}</Text>
            </ScrollView>
          )}
          indexContainerStyle={styles.indexContainerStyle}
          indexLetterStyle={styles.indexLetterStyle}
          indexLetterContainerStyle={styles.indexLetterContainerStyle}
        />
      ) : (
        section.length === 0 && (
          <View style={globalStyles.flexCenter}>
            <Text style={globalStyles.textCenter}>
              {Strings.noMatchingNote}
            </Text>
          </View>
        )
      )}
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Image source={Icons.add} style={styles.iconSize} />
      </TouchableOpacity>
    </Pressable>
  );
};

export default HomeScreen;
