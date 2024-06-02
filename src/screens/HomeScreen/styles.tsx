import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  flex1: {flex: 1},
  iconSize: {
    width: 20,
    height: 20,
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: Colors.white,
    top: 65,
    right: 10,
    zIndex: 1,
    borderRadius: 10,
    width: 130,
  },
  optionBtn: {
    padding: 8,
    paddingStart: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.appColorWith10Op,
    borderBottomWidth: 1,
  },
  optionText: {
    marginStart: 5,
  },
  actionBtn: {
    width: 20,
    height: 20,
  },
  header: {
    color: Colors.appColor,
    fontSize: 12,
    paddingStart: 5,
    fontWeight: '700',
  },
  justifyContentSpaceBtn: {justifyContent: 'space-between'},
  searchBar: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 5,
    paddingStart: 15,
    borderWidth: 1,
    borderRadius: 20,
    // marginEnd: 10,
  },
  sort: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginStart: 10,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    marginEnd: 10,
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.appColor,
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 0,
  },
  note: {
    backgroundColor: Colors.appColorWith10Op,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10,
  },
  noteTitleContainer: {
    flex: 1,
    marginStart: 20,
    justifyContent: 'center',
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  contactLikeIcon: {
    padding: 10,
    justifyContent: 'center',
  },
  more: {
    padding: 10,
  },
  likeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  noteStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingStart: 15,
    paddingEnd: 25,
    flex: 1,
  },
  indexContainerStyle: {
    width: 25,
  },
  indexLetterStyle: {
    fontSize: 15,
    color: Colors.appColor,
    marginBottom: 1,
  },
  indexLetterContainerStyle: {
    height: 25,
    width: 20,
  },
  likeBtn: {
    alignSelf: 'center',
  },
  dots: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
});

export default styles;
