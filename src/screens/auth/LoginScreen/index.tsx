import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import styles from './styles';
import globalStyles from '../../../utils/globalStyles';
import Loader from '../../../components/Loader';
import Icons from '../../../assets';
import Strings from '../../../translations/Strings';
import Colors from '../../../utils/Colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteStackParamsList} from '../../../navigators/AppNavigators';
import {Routes} from '../../../navigators/routes';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

interface userCredType {
  email: string;
  password: string;
}

interface errType {
  email?: string;
  password?: string;
}

type LoginScreenProps = NativeStackScreenProps<
  RouteStackParamsList,
  Routes.LoginScreen
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [userCreditentials, setUserCreditentials] = useState<userCredType>({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<errType>({email: '', password: ''});

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      if (!userCreditentials.email && !userCreditentials.password) {
        setError({
          email: Strings.required,
          password: Strings.required,
        });
        return;
      }
      if (!userCreditentials.email) {
        setError({email: Strings.required});
        return;
      }
      if (!userCreditentials.password) {
        setError({password: Strings.required});
        return;
      }
      if (
        !userCreditentials.email.includes('@') ||
        !userCreditentials.email.includes('.')
      ) {
        setError({email: Strings.invalidEmail});
        return;
      }
      setError({email: '', password: ''});
      setIsLoading(true);
      const isUserLoggedIn = await auth().signInWithEmailAndPassword(
        userCreditentials.email,
        userCreditentials.password,
      );
      setIsLoading(false);
      if (isUserLoggedIn.user.emailVerified) {
        navigation.dispatch(StackActions.replace('HomeScreen'));
      } else {
        await auth().currentUser?.sendEmailVerification();
        await auth().signOut();
        Toast.show(Strings.verifyEmail, Toast.LONG);
      }
    } catch (e) {
      const err: string = (e as any).code.split('/')[1].split('-').join(' ');
      Toast.show(err, Toast.LONG);
      setIsLoading(false);
    }
  };

  const handleForgetPassword = () =>
    navigation.navigate(Routes.ForgetPasswordScreen);

  const handelSignup = () => navigation.navigate(Routes.SignupScreen);
  return (
    <View style={globalStyles.container}>
      <Loader state={isLoading} />
      <View>
        <Text style={styles.welcomeHeader}>{Strings.welcomeText}</Text>
        <Text>{Strings.enterYourDetails}</Text>
      </View>
      <View style={styles.formBox}>
        <View style={styles.fieldArea}>
          <View style={styles.textArea}>
            <TextInput
              defaultValue={userCreditentials.email}
              onChangeText={email =>
                setUserCreditentials({...userCreditentials, email})
              }
              inputMode="email"
              placeholder={Strings.emailPlaceholder}
              placeholderTextColor={Colors.gray}
              style={globalStyles.flex1}
            />
          </View>
          <Text style={globalStyles.error}>{error.email}</Text>
        </View>
        <View style={styles.fieldArea}>
          <View style={styles.textArea}>
            <TextInput
              style={globalStyles.flex1}
              defaultValue={userCreditentials.password}
              secureTextEntry={!isPasswordVisible}
              onChangeText={password =>
                setUserCreditentials({...userCreditentials, password})
              }
              placeholder={Strings.passwordPlaceholder}
            />
            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Image
                source={!isPasswordVisible ? Icons.show : Icons.hide}
                style={styles.eye}
              />
            </TouchableOpacity>
          </View>
          <Text style={globalStyles.error}>{error.password}</Text>
        </View>
        <Text style={styles.forgetText} onPress={handleForgetPassword}>
          {Strings.forgotText}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleLogin} style={globalStyles.btn}>
          <Text style={globalStyles.btnText}>{Strings.loginBtn}</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.topBorder}>
        <Text style={globalStyles.textCenter}>
          {Strings.dontHaveAccount}
          <Text style={globalStyles.appColorText} onPress={handelSignup}>
            {Strings.signupBtn}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
