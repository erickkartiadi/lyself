import { StyleSheet } from 'react-native';

import { GUTTER_SIZE, THEME_SPACING } from './theme';

const appStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },

  flexDirRow: {
    flexDirection: 'row',
  },
  flexDirCol: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },

  w100: {
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: GUTTER_SIZE,
  },
  containerGutter: {
    paddingHorizontal: GUTTER_SIZE,
  },
  noContainerGutter: {
    marginHorizontal: GUTTER_SIZE * -1,
  },
  sectionLarge: {
    paddingVertical: THEME_SPACING.xl,
  },
  sectionMedium: {
    paddingVertical: THEME_SPACING.lg,
  },
  sectionSmall: {
    paddingVertical: THEME_SPACING.md,
  },

  // shadow generator -> https://ethercreative.github.io/react-native-shadow-generator/
  shadowLarge: {
    shadowColor: '#rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  shadowMedium: {
    shadowColor: '#rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  shadowSmall: {
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

export default appStyles;
