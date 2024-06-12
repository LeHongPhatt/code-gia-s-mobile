import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
export default StyleSheet.create({
  textWhite: {
    color: Colors.white,
    fontSize: 15,
  },
  contentDot: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: Colors.colorD9,
    width: 11,
    height: 11,
    marginRight: 8,
    borderRadius: 10,
  },
  dotActive: {
    backgroundColor: Colors.main,
    width: 11,
    height: 11,
    marginRight: 8,
    borderRadius: 10,
  },
  wrapperIntro: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    height: '100%',
    alignSelf: 'center',
    aspectRatio: 1,
  },
  bgLotie: { flex: 1, backgroundColor: Colors.main },
  contentImage: {
    flex: 1,
    marginBottom: 40,
    alignSelf: 'center',
  },
  viewContent: {
    flex: 0.9,
    paddingHorizontal: 30,
  },
  haflFlex: {
    flex: 0.2,
  },
  nextButton: {},
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 24,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  mr8: { marginRight: 8 },
  title: {
    fontSize: 24,
    color: Colors.black,
  },
  subtitle: {
    color: Colors.black,
    fontSize: 16,
  },
});
