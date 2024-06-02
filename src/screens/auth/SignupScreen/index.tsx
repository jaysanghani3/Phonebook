import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './styles';
import globalStyles from '../../../utils/globalStyles';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import Icons from '../../../assets';
import Strings from '../../../translations/Strings';
import {
  isEmailValid,
  isNameValid,
  isMobileNumberValid,
  isPasswordStrong,
  isPasswordMatched,
  isNameContainsNumber,
} from '../../../utils/validations';
import {RouteStackParamsList} from '../../../navigators/AppNavigators';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../../navigators/routes';
import {InputModeOptions} from '../../../../node_modules/react-native/Libraries/Components/TextInput/TextInput';
import {createUser} from '../../../services/firestore';

type SignupScreenProps = NativeStackScreenProps<
  RouteStackParamsList,
  Routes.SignupScreen
>;

interface IUserDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IError {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type IFields = {
  title: string;
  placeholder: string;
  value: string;
  type: InputModeOptions;
  errorMsg: string;
}[];

const SignupScreen = ({navigation}: SignupScreenProps) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const fields: IFields = [
    {
      title: 'fullName',
      value: userDetails.fullName,
      placeholder: 'Full Name',
      type: 'text',
      errorMsg: 'Please enter your Name',
    },
    {
      title: 'mobileNumber',
      value: userDetails.mobileNumber,
      placeholder: 'Mobile Number',
      type: 'tel',
      errorMsg: 'Please enter Mobile Number',
    },
    {
      title: 'email',
      value: userDetails.email,
      placeholder: 'Email',
      type: 'email',
      errorMsg: 'Please enter Email',
    },

    {
      title: 'password',
      value: userDetails.password,
      placeholder: 'Password',
      type: 'text',
      errorMsg: 'Please Fill Password',
    },
    {
      title: 'confirmPassword',
      value: userDetails.confirmPassword,
      placeholder: 'Confirm Password',
      type: 'text',
      errorMsg: 'Please fill Password or Password not matched ',
    },
  ];
  const [error, setError] = useState<IError>({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePress = async () => {
    try {
      if (!userDetails.fullName) {
        setError({fullName: Strings.required});
        return;
      }
      if (isNameContainsNumber(userDetails.fullName)) {
        setError({fullName: Strings.charName});
        return;
      }
      if (!isNameValid(userDetails.fullName)) {
        setError({fullName: Strings.invalidName});
        return;
      }
      if (!userDetails.mobileNumber) {
        setError({mobileNumber: Strings.required});
        return;
      }
      if (!isMobileNumberValid(userDetails.mobileNumber)) {
        setError({mobileNumber: Strings.invalidPhone});
        return;
      }
      if (!userDetails.email) {
        setError({email: Strings.required});
        return;
      }
      if (!isEmailValid(userDetails.email)) {
        setError({email: Strings.invalidEmail});
        return;
      }
      if (!userDetails.password) {
        setError({password: Strings.required});
        return;
      }
      if (!userDetails.confirmPassword) {
        setError({confirmPassword: Strings.required});
        return;
      }
      if (
        !isPasswordMatched(userDetails.password, userDetails.confirmPassword)
      ) {
        setError({confirmPassword: Strings.invalidPasswordConfirmation});
        return;
      }
      if (!isPasswordStrong(userDetails.password)) {
        setError({password: Strings.strongPassword});
        return;
      }
      setError({});

      setIsLoading(true);
      createUser(
        userDetails.email,
        userDetails.password,
        userDetails.fullName,
        userDetails.mobileNumber,
      );
      setIsLoading(false);
      Toast.show(Strings.linkSend, Toast.LONG);
      navigation.navigate(Routes.LoginScreen);
    } catch (e) {
      const err: string = (e as any).code.split('/')[1].split('-').join(' ');
      Toast.show(err, Toast.LONG);
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Loader state={isLoading} />

      <View>
        <Text style={styles.welcomeHeader}>{Strings.createAccount}</Text>
        <Text>{Strings.signupToGetStarted}</Text>
      </View>

      <View style={styles.formBox}>
        {fields.map((field, index: number) => (
          <View key={index} style={styles.fieldArea}>
            <View style={styles.textArea}>
              <TextInput
                inputMode={field.type}
                key={index}
                value={field.value}
                onChangeText={newValue => {
                  setUserDetails({...userDetails, [field.title]: newValue});
                }}
                style={globalStyles.flex1}
                placeholder={field.placeholder}
                secureTextEntry={
                  field.title === 'password'
                    ? !isPasswordVisible
                    : field.title === 'confirmPassword' &&
                      !isConfirmPasswordVisible
                }
              />
              {field.title === 'password' && (
                <TouchableOpacity
                  style={styles.eyeContainer}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Image
                    source={!isPasswordVisible ? Icons.show : Icons.hide}
                    style={styles.eye}
                  />
                </TouchableOpacity>
              )}
              {field.title === 'confirmPassword' && (
                <TouchableOpacity
                  style={styles.eyeContainer}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }>
                  <Image
                    source={!isConfirmPasswordVisible ? Icons.show : Icons.hide}
                    style={styles.eye}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error[field.title as keyof IError] !== '' && (
              <Text style={globalStyles.error}>
                {error[field.title as keyof IError]}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View>
        <TouchableOpacity onPress={handlePress} style={globalStyles.btn}>
          <Text style={globalStyles.btnText}>{Strings.signupBtn}</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.topBorder}>
        <Text
          style={globalStyles.textCenter}
          onPress={() => navigation.navigate('LoginScreen')}>
          {Strings.alreadyHaveAccount}
          <Text style={globalStyles.appColorText}> {Strings.loginBtn}</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
