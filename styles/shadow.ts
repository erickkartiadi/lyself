import { StyleSheet } from 'react-native';

// shadow generator -> https://ethercreative.github.io/react-native-shadow-generator/
const shadow = StyleSheet.create({
  lg: {
    shadowColor: '#rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  medium: {
    shadowColor: '#rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  sm: {
    shadowColor: '#rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default shadow;
