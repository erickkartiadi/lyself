/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
const { withAndroidStyles } = require('@expo/config-plugins');

// Add `<item name="android:colorEdgeEffect">...</item>` to the styles.xml
function addAndroidColorEdgeEffectToStyles(androidStyles, color) {
  let { resources } = androidStyles;
  if (!resources) {
    resources = {
      $: {
        'xmlns:tools': 'http://schemas.android.com/tools',
      },
    };
    androidStyles.resources = resources;
  }

  let styles = resources.style;
  if (!Array.isArray(styles)) {
    styles = [];
    resources.style = styles;
  }

  let appTheme = styles.find((item) => item.$.name === 'AppTheme');
  if (!appTheme) {
    appTheme = {
      $: {
        name: 'AppTheme',
        parent: 'Theme.AppCompat.Light.NoActionBar',
      },
    };
    styles.push(appTheme);
  }

  let items = appTheme.item;
  if (!Array.isArray(items)) {
    items = [];
    appTheme.item = items;
  }

  let colorEdgeEffect = styles.find((item) => item.$.name === 'android:colorEdgeEffect');
  if (colorEdgeEffect) {
    colorEdgeEffect._ = color;
  } else {
    colorEdgeEffect = {
      $: {
        name: 'android:colorEdgeEffect',
      },
      _: color,
    };
    items.push(colorEdgeEffect);
  }

  return androidStyles;
}

module.exports = function withAndroidColorEdgeEffect(config, { color }) {
  return withAndroidStyles(config, (config) => {
    config.modResults = addAndroidColorEdgeEffectToStyles(config.modResults, color);
    return config;
  });
};
