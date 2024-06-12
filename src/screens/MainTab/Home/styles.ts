import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bgHead: {
    backgroundColor: Colors.white,
  },
  boxDriver: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
  },
  boxLogo: {
    width: 65,
    height: 65,
  },
  badget: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    top: -7,
    right: 7,
  },
  mr17: { marginRight: 17 },
  centItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  endItemvh: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rowItem: {
    flexDirection: 'row',
  },
  spaceArroundItem: {
    justifyContent: 'space-around',
  },
  w100: {
    width: '100%',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  bgStatus: {
    backgroundColor: Colors.statusColor,
  },
  containerBell: {
    backgroundColor: '#DADADA',
    // paddingHorizontal: 11,
    borderRadius: 80,
    // paddingVertical: 10,
    width: 50, height: 50,
    alignItems:'center',
    justifyContent:'center',
  },
  tick: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
  },
  logo: { width: 50, height: 50, resizeMode: 'contain' },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    // paddingBottom: 5,
    marginBottom: 16,
  },
});
