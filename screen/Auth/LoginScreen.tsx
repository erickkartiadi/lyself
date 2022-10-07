import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text, useTheme } from '@rneui/themed';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import loginIllustration from '../../assets/images/login-illustration.png';
import BackButton from '../../components/base/BackButton';
import TextInput from '../../components/base/Input';
import NavLink from '../../components/base/NavLink';
import PasswordInput from '../../components/base/PasswordInput';
import { LoginScreenNavigationProps } from '../../navigation/navigation.types';
import { login } from '../../services/api/auth/auth.api';
import { styles } from '../../theme/styles';
import { User } from '../../types/types';
import { loginSchema } from '../../utils/constant/validation/auth.schema';

type LoginFormData = Omit<User, 'id' | 'name'>;

function LoginScreen({ navigation }: LoginScreenNavigationProps) {
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const mutation = useMutation(login, {
    onSuccess: () => {
      navigation.navigate('HomeTab', {
        screen: 'Home',
      });

      reset();
    },
    onError: (error: FirebaseError) => {
      Toast.show({
        type: 'error',
        text1: error.name,
        text2: error.message,
      });
    },
  });

  const handleLogin = async (loginFormData: LoginFormData) => {
    mutation.mutate(loginFormData);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
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
            justifyContent: 'flex-end',
            marginTop: theme.spacing.xl * -1,
            marginBottom: theme.spacing.xl * 1.25,
          }}
        >
          <NavLink to={{ screen: 'ForgotPassword' }}>Forgot Password?</NavLink>
        </View>
        <Button
          loading={mutation.isLoading}
          fullWidth
          onPress={handleSubmit(handleLogin)}
        >
          Login
        </Button>
        <View
          style={[
            styles.sectionLarge,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Text>Didn&apos;t have an account? </Text>
          <NavLink to={{ screen: 'Register' }} color="primary">
            Sign Up
          </NavLink>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default LoginScreen;
