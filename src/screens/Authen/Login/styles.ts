import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'theme';
export default StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    flexGrow: 1,
  },
  flex04: {
    alignSelf: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        flex: 0.2,
      },
      ios: {
        flex: 0.2,
      },
    }),
  },
  flex06: {
    flex: 0.6,
  },
  content: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  btnActive: {
    backgroundColor: Colors.black,
    borderRadius: 8,
  },
  size: {
    fontSize: 14,
    color: Colors.grey85,
  },
  unline: {
    textDecorationLine: 'underline',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.greyEE,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  fl1: {
    flex: 1,
    marginLeft: 8,
  },
});
