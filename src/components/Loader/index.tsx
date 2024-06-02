import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './styles.tsx';
import Colors from '../../utils/Colors.ts';
import Strings from '../../translations/Strings.ts';

const Loader = ({state}: {state: boolean}) => {
  if (!state) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color={Colors.appColor} />
        <Text>{Strings.loading}</Text>
      </View>
    </View>
  );
};

export default Loader;
