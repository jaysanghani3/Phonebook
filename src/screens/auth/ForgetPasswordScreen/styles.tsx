import {StyleSheet} from 'react-native';
import Colors from '../../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 25,
  },
  welcomeHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  formBox: {
    marginVertical: 50,
  },
  textArea: {
    height: 50,
    paddingStart: 10,
    borderRadius: 8,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginVertical: 5,
  },
  redText: {
    color: Colors.error,
  },
  icon: {
    width: 350,
    height: 350,
  },
});

export default styles;
