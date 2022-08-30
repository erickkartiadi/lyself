import React from 'react';
import { Button, CheckBox, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import { styles } from '../../theme/styles';
import loginIllustration from '../../assets/images/login-illustration.png';
import useToggle from '../../utils/hooks/useToggle';
import TextInput from '../../components/forms/Input';
import PasswordInput from '../../components/forms/PasswordInput';
import LinkButton from '../../components/LinkButton';
import { LoginScreenNavigationProps } from '../../navigation/navigation.types';

function LoginScreen({ navigation }: LoginScreenNavigationProps) {
  const { theme } = useTheme();
  const [isRememberLogin, toggleIsRememberLogin] = useToggle(false);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.containerGutter, styles.section]}
    >
      <SafeAreaView>
        <BackButton />
        <Text h1>Welcome to Lyself</Text>
        <Text>Login to continue.</Text>
        <View
          style={{
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={loginIllustration}
            style={{
              flex: 1,
              width: '100%',
            }}
            resizeMode="center"
          />
        </View>
        <TextInput label="Email address" placeholder="example@email.com" />
        <PasswordInput
          label="Password"
          placeholder="must have at least 8 characters"
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
          <LinkButton to={{ screen: 'ForgotPassword' }}>
            Forgot Password?
          </LinkButton>
        </View>
        <Button
          fullWidth
          onPress={() => navigation.navigate('HomeTab', { screen: 'Home' })}
        >
          Login
        </Button>
        <View
          style={[
            styles.section,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Text>Didn&apos;t have an account? </Text>
          <LinkButton to={{ screen: 'Register' }} color="primary">
            Sign Up
          </LinkButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default LoginScreen;
