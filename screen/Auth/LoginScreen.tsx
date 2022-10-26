import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import loginIllustration from '../../assets/images/login-illustration.png';
import BackButton from '../../components/base/BackButton';
import NavLink from '../../components/base/NavLink';
import PasswordInput from '../../components/base/PasswordInput';
import TextInput from '../../components/base/TextInput';
import { LoginScreenNavigationProps } from '../../navigation/navigation.types';
import { LoginDto } from '../../services/api/auth/auth.api';
import { useLogin } from '../../services/api/auth/auth.hooks';
import layout from '../../styles/layout';
import { height, width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { loginSchema } from '../../utils/constant/validation/auth.schema';

function LoginScreen({ navigation }: LoginScreenNavigationProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const handleLogin = async (loginFormData: LoginDto) => {
    loginMutation.mutate(loginFormData, {
      onSuccess: () => {
        navigation.navigate('HomeTab', {
          screen: 'Home',
        });
        reset();
      },
    });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[layout.container_gutter, layout.section_lg]}
    >
      <SafeAreaView>
        <BackButton />
        <Text h1>Welcome to Lyself</Text>
        <Text>Login to continue.</Text>
        <View style={[layout.align_center]}>
          <View style={[height.h_13xl, layout.ratio_square]}>
            <Image
              source={loginIllustration}
              style={[layout.flex, width.w_100]}
              resizeMode="center"
            />
          </View>
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              renderErrorMessage={errors.password !== undefined}
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
              renderErrorMessage={errors.password !== undefined}
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
          style={[
            layout.flex,
            width.w_100,
            layout.flex_dir_row,
            layout.align_center,
            layout.justify_end,
            spacing.mt_n_lg,
          ]}
        >
          <NavLink to={{ screen: 'ForgotPassword' }}>Forgot Password?</NavLink>
        </View>
        <Button
          containerStyle={layout.section_lg}
          loading={loginMutation.isLoading}
          onPress={handleSubmit(handleLogin)}
        >
          Login
        </Button>
        <View
          style={[
            layout.section_lg,
            layout.flex_dir_row,
            layout.justify_center,
            layout.align_center,
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
