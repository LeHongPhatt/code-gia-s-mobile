import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { dimensions } from 'utils';
const isIos = Platform.OS === 'ios';
const { width } = dimensions;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rowItem: {
    flexDirection: 'row',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  cenItem: {
    alignItems: 'center',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: Colors.mainLight,
  },
  input: {
    height: 56,
    borderRadius: 5,
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray82,
    color: Colors.gray82,
    backgroundColor: Colors.white,
  },
  inputDisabled: {
    height: 56,
    borderRadius: 5,
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray82,
    color: Colors.gray82,
    backgroundColor: Colors.whisper,
  },
  inputError: {
    height: 56,
    borderRadius: 5,
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.error,
    color: Colors.error,
    backgroundColor: Colors.white,
  },
  wrapAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.border,
  },
  posAbsolute: {
    position: 'absolute',
  },
  posBtnCamera: {
    bottom: 0,
    right: 0,
  },
  wrapBtnCamera: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.main,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  form: {
    marginBottom: isIos ? 70 : 40,
    alignItems: 'flex-start',
  },
  fieldTextRequired: {
    color: Colors.error,
    textAlign: 'left',
  },
  bgWhite: {
    backgroundColor: Colors.blue1B,
  },
  boxImg: { height: 156, marginBottom: 8 },
  imgItem: { width: width * 0.5 - 30 },
  h100: { height: '100%' },
  fs16: {
    fontSize: 16,
  },
  lh24: {
    lineHeight: 24,
  },
  flex1: {
    flex: 1,
  },
  radius4: {
    borderRadius: 4,
  },
  color: {},
});
