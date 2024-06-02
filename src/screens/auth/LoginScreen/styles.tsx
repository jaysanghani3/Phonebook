import {StyleSheet} from 'react-native';
import Colors from '../../../utils/Colors';
const styles = StyleSheet.create({
  welcomeHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  forgetText: {
    color: Colors.appColor,
    textAlign: 'right',
  },
  formBox: {
    marginVertical: 40,
  },
  fieldArea: {
    marginVertical: 10,
  },
  textArea: {
    paddingStart: 10,
    // display: 'block',
    borderRadius: 8,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  eyeContainer: {
    padding: 20,
  },
  eye: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 15,
    top: 11,
  },
});

export default styles;
