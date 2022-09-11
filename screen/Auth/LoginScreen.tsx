import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CheckBox, Text, useTheme } from '@rneui/themed';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import loginIllustration from '../../assets/images/login-illustration.png';
import BackButton from '../../components/BackButton';
import TextInput from '../../components/forms/Input';
import PasswordInput from '../../components/forms/PasswordInput';
import LinkButton from '../../components/LinkButton';
import { ErrorResponseData } from '../../services/api/axios.types';
import { login } from '../../services/api/user';
import { loginSchema } from '../../services/validation/schema';
import { styles } from '../../theme/styles';
import { LoginScreenNavigationProps } from '../../types/navigation.types';
import { User } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';

type LoginFormData = Omit<User, 'id' | 'name'>;

function LoginScreen({ navigation }: LoginScreenNavigationProps) {
  const { theme } = useTheme();
  const [isRememberLogin, toggleIsRememberLogin] = useToggle(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsButtonLoading(true);

    try {
      await login({ email: data.email, password: data.password });

      // TODO  process token

      navigation.navigate('HomeTab', {
        screen: 'Home',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { statusCode } = error.response?.data as ErrorResponseData;

        if (statusCode === 401) {
          Toast.show({
            type: 'error',
            text1: 'Invalid email or password',
          });
        } else {
          throw new Error();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again later',
        });
      }
    }

    setIsButtonLoading(false);
  };

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
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              errorMessage={errors.email && errors.email.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label="Email address"
              placeholder="example@email.com"
              textContentType="emailAddress"
              autoComplete="email"
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              autoComplete="password"
              textContentType="password"
              errorMessage={errors.password && errors.password.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              label="Password"
              placeholder="your secret password"
            />
          )}
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
          <LinkButton to={{ screen: 'ForgotPassword' }}>Forgot Password?</LinkButton>
        </View>
        <Button loading={isButtonLoading} fullWidth onPress={handleSubmit(handleLogin)}>
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
          <Text small>Didn&apos;t have an account? </Text>
          <LinkButton to={{ screen: 'Register' }} color="primary">
            Sign Up
          </LinkButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default LoginScreen;
