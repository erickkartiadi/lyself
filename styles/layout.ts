import { StyleSheet } from 'react-native';

import { GUTTER_SIZE, SPACES } from '../theme/theme';

const layout = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flex_grow: {
    flexGrow: 1,
  },
  flex_shrink: {
    flexShrink: 1,
  },
  flex_wrap: {
    flexWrap: 'wrap',
  },

  flex_dir_row: {
    flexDirection: 'row',
  },
  flex_dir_col: {
    flexDirection: 'column',
  },
  align_center: {
    alignItems: 'center',
  },
  align_start: {
    alignItems: 'flex-start',
  },
  align_end: {
    alignItems: 'flex-end',
  },
  align_self_start: {
    alignSelf: 'flex-start',
  },
  align_self_end: {
    alignSelf: 'flex-end',
  },
  justify_center: {
    justifyContent: 'center',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  justify_start: {
    justifyContent: 'flex-start',
  },

  container: {
    flex: 1,
    paddingHorizontal: GUTTER_SIZE,
  },
  container_gutter: {
    paddingHorizontal: GUTTER_SIZE,
  },
  no_container_gutter: {
    marginHorizontal: GUTTER_SIZE * -1,
  },
  section_lg: {
    paddingVertical: SPACES.xl,
  },
  section_md: {
    paddingVertical: SPACES.lg,
  },
  section_sm: {
    paddingVertical: SPACES.md,
  },

  // layout
  ratio_square: {
    aspectRatio: 1,
  },
  ratio_fourThree: {
    aspectRatio: 4 / 3,
  },
  ratio_wide: {
    aspectRatio: 16 / 9,
  },

  // position
  position_absolute: {
    position: 'absolute',
  },
  position_relative: {
    position: 'relative',
  },

  overflow_hidden: {
    overflow: 'hidden',
  },

  // display
  display_none: {
    display: 'none',
  },
  display_flex: {
    display: 'flex',
  },
});

export default layout;
