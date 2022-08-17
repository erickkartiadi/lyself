import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, CheckBox, Icon, Input, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/index';
import loginIllustration from '../../assets/images/login-illustration.png';
import useToggle from '../../utils/hooks/useToggle';

export type LoginPageProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Login'
>;

function LoginPage({ navigation }: LoginPageProps) {
  const { theme } = useTheme();
  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);
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
        <Button
          type="outline"
          onPress={() => navigation.navigate('GetStarted')}
          containerStyle={{
            alignSelf: 'flex-start',
            marginBottom: theme.spacing.lg,
          }}
          buttonStyle={{ padding: 10, paddingHorizontal: 10 }}
        >
          <Icon
            size={20}
            name="arrow-back-outline"
            type="ionicon"
            containerStyle={{ aspectRatio: 1, padding: 0 }}
          />
        </Button>
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
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Email"
          placeholder="example@email.com"
        />
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Password"
          placeholder="must have at least 8 characters"
          secureTextEntry={!isPasswordVisible}
          rightIcon={
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              type="ionicon"
              size={24}
              iconStyle={{ padding: theme.spacing.sm }}
              color={theme.colors.black}
              onPress={() => togglePasswordVisible()}
            />
          }
        />
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
