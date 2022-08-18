import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, CheckBox, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/index';
import loginIllustration from '../../assets/images/login-illustration.png';
import useToggle from '../../utils/hooks/useToggle';
import { InputPassword, InputText } from '../../components/form/Input';
import ButtonBack from '../../components/ButtonBack';

export type LoginPageProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Login'
>;

function LoginPage({ navigation }: LoginPageProps) {
  const { theme } = useTheme();
  const [isRememberLogin, toggleIsRememberLogin] = useToggle(false);

  return (
    <ScrollView>
      <SafeAreaView
        style={[
          styles.containerSection,
          {
            paddingVertical: theme.spacing.xl,
          },
        ]}
      >
        <ButtonBack onPress={() => navigation.navigate('GetStarted')} />
        <Text h1 bold>
          Welcome to Lyself
        </Text>
        <Text>Login to continue.</Text>
        <View
          style={{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={loginIllustration}
            style={{
              flex: 1,
              width: '80%',
            }}
            resizeMode="center"
          />
        </View>
        <InputText label="Email address" placeholder="example@email.com" />
        <InputPassword />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: theme.spacing.lg * -1,
            marginBottom: theme.spacing.lg,
          }}
        >
          <CheckBox
            title="Remember Me"
            checked={isRememberLogin}
            onPress={() => toggleIsRememberLogin()}
          />
          <Text
            subtitle2
            style={{
              color: theme.colors.secondary,
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Forgot Password?
          </Text>
        </View>
        <Button fullWidth onPress={() => navigation.navigate('HomeRoutes')}>
          Login
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.xl * 2,
          }}
        >
          <Text subtitle2>Didn&apos;t have an account? </Text>
          <Text
            bold
            subtitle2
            onPress={() => navigation.navigate('Register')}
            style={{
              color: theme.colors.primary,
            }}
          >
            Sign Up{' '}
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default LoginPage;
