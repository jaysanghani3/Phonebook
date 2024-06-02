import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../../utils/globalStyles';
import styles from './styles';
import Strings from '../../../translations/Strings';
import Icons from '../../../assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteStackParamsList} from '../../../navigators/AppNavigators';
import {Routes} from '../../../navigators/routes';

type SplashScreenProps = NativeStackScreenProps<
  RouteStackParamsList,
  Routes.SplashScreen
>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user === null) {
          navigation.replace('LoginScreen');
          return;
        } else if (user.emailVerified) {
          navigation.replace(Routes.HomeScreen);
        }
      });
      return unsubscribe;
    }, 2000);
  }, [navigation]);

  return (
    <View style={globalStyles.flexCenter}>
      <Image source={Icons.logo} style={styles.logo} />
      <Text style={styles.phonebook}>{Strings.phonebook}</Text>
    </View>
  );
};

export default SplashScreen;
