import {
  ButtonProps,
  CreateThemeOptions,
  TextProps,
  createTheme,
} from '@rneui/themed';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const themeSpacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: themeSpacing.xl,
  },
  noContainerOffset: {
    marginHorizontal: themeSpacing.xl * -1,
  },
  containerSection: {
    paddingHorizontal: themeSpacing.xl,
    marginTop: themeSpacing.xl,
    marginBottom: themeSpacing.xl,
  },
  flatList: {
    paddingHorizontal: themeSpacing.xl,
    paddingBottom: themeSpacing.xl,
  },
  flatListContainer: {
    // remove container offset
    marginHorizontal: themeSpacing.xl * -1,

    // remove FlatList padding bottom
    marginBottom: themeSpacing.xl * -1,
  },
});

const lightColors = {
  primary: '#FF7096',
  primaryLight: '#FFB8CB',
  secondary: '#7096FF',
  secondaryLight: '#B8CBFF',
  purple: '#9270FF',
  yellow: '#FFCC3E',
  background: '#FDFDFD',
  cardBackground: '#FFFFFF',
  blue: '#30ACF4',
  error: '#FF0A54',
  textColor: '#242424',
  brand: {
    spotify: '#1db954',
    google: '#ea4335',
    facebook: '#1877f2',
    apple: '#000000',
  },
};
const darkColors = {
  primary: '#FF5683',
  primaryLight: '#FFABC1',
  secondary: '#5784FF',
  secondaryLight: '#ABC1FF',
  purple: '#7D56FF',
  yellow: '#FFC527',
  background: '#111111',
  cardBackground: '#171717',
  textColor: '#F2F2F2',
  blue: '#1BA4F3',
  error: '#E30044',
  brand: {
    spotify: '#1db954',
    google: '#ea4335',
    facebook: '#1877f2',
    apple: '#000000',
  },
};
const myTheme: CreateThemeOptions = createTheme({
  spacing: { ...themeSpacing },
  components: {
    Input: () => ({
      labelStyle: {
        fontSize: 14.22,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.1,
        marginBottom: themeSpacing.xs,
      },
      inputStyle: { fontFamily: 'Quicksand', fontSize: 16 },
      inputContainerStyle: {
        borderBottomWidth: 0.75,
      },
      containerStyle: { paddingHorizontal: 0 },
    }),
    Card: {
      containerStyle: {
        margin: 0,
        padding: themeSpacing.lg,
        marginTop: themeSpacing.md,
        marginBottom: themeSpacing.md,
      },
    },
    SearchBar: {
      style: {
        fontFamily: 'Quicksand',
      },
      inputStyle: {
        fontSize: 14.22,
      },
    },
    CheckBox: {
      fontFamily: 'Quicksand-Medium',
      textStyle: { fontWeight: '500', marginTop: -4 },
      containerStyle: {
        padding: 0,
        marginLeft: 0,
        paddingVertical: themeSpacing.md,
      },
    },
    Text: (props: TextProps) => ({
      style: {
        // default
        ...{
          fontSize: 16,
          letterSpacing: 0.5,
          fontFamily: 'Quicksand',
          fontWeight: '400',
        },

        ...(props.subtitle1 && {
          fontSize: 16,
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
          letterSpacing: 0.15,
          marginBottom: themeSpacing.xs,
        }),
        ...(props.subtitle2 && {
          fontSize: 14.22,
          fontFamily: 'Quicksand',
          letterSpacing: 0.15,
        }),
        ...(props.caption && {
          fontSize: 12.64,
          fontFamily: 'Quicksand',
          fontWeight: '400',
          letterSpacing: 0.3,
        }),
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h1Style: {
        fontSize: 25.63,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: -0.25,
        marginBottom: themeSpacing.sm,
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h2Style: {
        fontSize: 22.78,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.125,
        marginBottom: themeSpacing.sm,
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h3Style: {
        fontSize: 20.25,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.1,
        marginBottom: themeSpacing.sm,
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h4Style: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        fontWeight: 'normal',
        letterSpacing: -0.5,
        marginBottom: themeSpacing.sm,
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
    }),
    Button: (props: ButtonProps) => ({
      radius: 999,
      containerStyle: {
        alignItems: props.fullWidth ? 'stretch' : 'center',
      },
      titleStyle: {
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        fontSize: 14.22,
        letterSpacing: 1.25,
      },
      size: 'lg',
      uppercase: true,
    }),
  },
  lightColors,
  darkColors,
});

const navThemeLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: myTheme.lightColors?.primary as string,
    background: myTheme.lightColors?.background as string,
    card: myTheme.lightColors?.cardBackground as string,
    border: myTheme.lightColors?.grey4 as string,
    notification: myTheme.lightColors?.error as string,
  },
};

const navThemeDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: myTheme.darkColors?.primary as string,
    background: myTheme.darkColors?.background as string,
    card: myTheme.darkColors?.cardBackground as string,
    border: myTheme.darkColors?.grey4 as string,
    notification: myTheme.darkColors?.error as string,
  },
};

export { myTheme, navThemeLight, navThemeDark };
