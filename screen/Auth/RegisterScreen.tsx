import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import registerIllustration from '../../assets/images/register-illustration.png';
import BackButton from '../../components/base/BackButton';
import NavLink from '../../components/base/NavLink';
import PasswordInput from '../../components/base/PasswordInput';
import TextInput from '../../components/base/TextInput';
import { RegisterScreenNavigationProps } from '../../navigation/navigation.types';
import { RegisterUserDto } from '../../services/api/auth/auth.api';
import { useRegister } from '../../services/api/auth/auth.hooks';
import layout from '../../styles/layout';
import { height, width } from '../../styles/size';
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

  const mutation = useRegister();

  const handleRegister = async (registerFormData: RegisterUserDto) => {
    mutation.mutate(registerFormData, {
      onSuccess: () => {
        navigation.navigate('Login');
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
        <Text h1>Create new account</Text>
        <Text>Just one more step to be part of the {'\n'}Lyself community.</Text>
        <View style={[layout.align_center]}>
          <View style={[height.h_13xl, layout.ratio_square]}>
            <Image
              source={registerIllustration}
              style={[layout.flex, width.w_100]}
              resizeMode="center"
            />
          </View>
        </View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              renderErrorMessage={errors.name !== undefined}
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
              renderErrorMessage={errors.email !== undefined}
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
        <Button
          containerStyle={layout.section_md}
          loading={mutation.isLoading}
          onPress={handleSubmit(handleRegister)}
        >
          Create Account
        </Button>
        <View
          style={[
            layout.section_lg,
            layout.flex_dir_row,
            layout.justify_center,
            layout.align_center,
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
