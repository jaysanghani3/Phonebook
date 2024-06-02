import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors.ts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.blackWith50Op,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
