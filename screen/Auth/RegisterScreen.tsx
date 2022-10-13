import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import registerIllustration from '../../assets/images/register-illustration.png';
import BackButton from '../../components/base/BackButton';
import NavLink from '../../components/base/NavLink';
import PasswordInput from '../../components/base/PasswordInput';
import TextInput from '../../components/base/TextInput';
import { RegisterScreenNavigationProps } from '../../navigation/navigation.types';
import { register, RegisterUserDto } from '../../services/api/auth/auth.api';
import layout from '../../styles/layout';
import { registerSchema } from '../../utils/constant/validation/auth.schema';

function RegisterScreen({ navigation }: RegisterScreenNavigationProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserDto>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const mutation = useMutation(register, {
    onSuccess: ({ user: { email } }) => {
      Toast.show({
        type: 'success',
        text1: 'Email confirmation sent',
        text2: `We have sent you a confirmation email to ${email}, please confirm your email address.`,
      });
      navigation.navigate('Login');

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

  const handleRegister = async (registerFormData: RegisterUserDto) => {
    mutation.mutate(registerFormData);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[layout.containerGutter, layout.sectionLarge]}
    >
      <SafeAreaView>
        <BackButton />
        <Text h1>Create new account</Text>
        <Text>Just one more step to be part of the {'\n'}Lyself community.</Text>
        <View
          style={[layout.justifyCenter, layout.alignCenter, layout.aspectRatioSquare]}
        >
          <Image
            source={registerIllustration}
            style={[layout.flex, layout.w100]}
            resizeMode="center"
          />
        </View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              errorMessage={errors.name && errors.name.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Name"
              placeholder="eg. John Doe"
              textContentType="name"
              autoComplete="name"
            />
          )}
        />
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
        <Button loading={mutation.isLoading} onPress={handleSubmit(handleRegister)}>
          Create Account
        </Button>
        <View
          style={[
            layout.sectionLarge,
            layout.flexDirRow,
            layout.justifyCenter,
            layout.alignCenter,
          ]}
        >
          <Text>Already have an account? </Text>
          <NavLink to={{ screen: 'Login' }} color="primary">
            Login
          </NavLink>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default RegisterScreen;
