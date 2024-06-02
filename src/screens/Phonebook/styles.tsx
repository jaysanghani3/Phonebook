import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.appColor,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    paddingVertical: 7,
    width: 80,
    backgroundColor: Colors.whiteWith20Op,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  headerText: {
    fontSize: 12,
    color: Colors.white,
  },
  profileImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColorWith50Op,
    padding: 10,
    height: 250,
    marginBottom: 20,
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 80,
    alignSelf: 'center',
  },
  imgBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imgBtn: {
    padding: 10,
    backgroundColor: Colors.whiteWith20Op,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  imgSize: {
    width: 30,
    height: 30,
  },
  btnText: {
    fontSize: 15,
    color: Colors.white,
  },
  inputContainer: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  textArea: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    paddingStart: 15,
  },
  delContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteBtn: {
    backgroundColor: Colors.error,
    padding: 10,
    justifyContent: 'center',
    width: 150,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  delImgSize: {
    width: 20,
    height: 20,
  },
  deleteBtnText: {
    fontSize: 17,
    color: Colors.white,
    marginStart: 20,
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dltTitle: {
    paddingTop: 20,
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  delBtn: {
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '50%',
    borderBottomRightRadius: 20,
  },
  delBtnContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.blackWith50Op,
  },
  btnWidth: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});

export default styles;
