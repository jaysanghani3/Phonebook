import {StyleSheet} from 'react-native';
import Colors from './Colors';

const globalStyles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
  flex1: {flex: 1},
  appColorText: {color: Colors.appColor},
  textCenter: {textAlign: 'center'},
  btn: {backgroundColor: Colors.appColor, padding: 10, borderRadius: 8},
  btnText: {color: Colors.white, textAlign: 'center', fontWeight: 'bold'},
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 25,
    justifyContent: 'center',
  },
  topBorder: {
    marginTop: 50,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: Colors.appColor,
    padding: 10,
    justifyContent: 'space-between',
  },
  error: {
    fontSize: 12,
    marginStart: 10,
    color: Colors.error,
  },
});
export default globalStyles;
