import { StyleSheet } from 'react-native';

import { GUTTER_SIZE, SPACES } from '../theme/theme';

const layout = StyleSheet.create({
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
    paddingVertical: SPACES.xl,
  },
  sectionMedium: {
    paddingVertical: SPACES.lg,
  },
  sectionSmall: {
    paddingVertical: SPACES.md,
  },

  // layout
  aspectRatioSquare: {
    aspectRatio: 1,
  },
  aspectRatioFourThree: {
    aspectRatio: 4 / 3,
  },
  aspectRatioWide: {
    aspectRatio: 16 / 9,
  },

  // width or height
  w25: {
    width: '25%',
  },
  w50: {
    width: '50%',
  },
  w75: {
    width: '75%',
  },
  w100: {
    width: '100%',
  },
  h25: {
    height: '25%',
  },
  h50: {
    height: '50%',
  },
  h75: {
    height: '75%',
  },
  h100: {
    height: '100%',
  },

  // position
  positionAbsolute: {
    position: 'absolute',
  },
  positionRelative: {
    position: 'relative',
  },

  overflowHidden: {
    overflow: 'hidden',
  },

  // display
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
  },
});

export default layout;
