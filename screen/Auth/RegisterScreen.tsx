import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import registerIllustration from '../../assets/images/register-illustration.png';
import BackButton from '../../components/BackButton';
import TextInput from '../../components/forms/Input';
import PasswordInput from '../../components/forms/PasswordInput';
import LinkButton from '../../components/LinkButton';
import { register } from '../../services/api/auth';
import { registerSchema } from '../../services/validation/schema';
import { styles } from '../../theme/styles';
import { ErrorResponseData } from '../../types/axios.types';
import { RegisterScreenNavigationProps } from '../../types/navigation.types';
import { User } from '../../types/types';
import { somethingWentWrongToast } from '../../utils/toast';

type RegisterFormData = Omit<User, 'id'>;

function RegisterScreen({ navigation }: RegisterScreenNavigationProps) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async ({ email, name, password }: RegisterFormData) => {
    setIsButtonLoading(true);

    try {
      const user = await register({ email, name, password });
      if (!user) throw new Error();

      Toast.show({
        text1: 'Account Created',
        text2: `We have sent you a confirmation email to ${user.data.email}, please confirm your email address.`,
        visibilityTime: 10000,
      });

      navigation.navigate('Login');
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { message } = error.response?.data as ErrorResponseData;

        Toast.show({
          type: 'error',
          text1: message instanceof Array ? message[0] : message,
        });
      } else {
        somethingWentWrongToast();
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
        <Text h1>Create new account</Text>
        <Text>Just one more step to be part of the {'\n'}Lyself community.</Text>
        <View
          style={{
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={registerIllustration}
            style={{
              flex: 1,
              width: '100%',
            }}
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
        <Button
          loading={isButtonLoading}
          fullWidth
          onPress={handleSubmit(handleRegister)}
        >
          Create Account
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
          <Text small>Already have an account? </Text>
          <LinkButton to={{ screen: 'Login' }} color="primary">
            Login
          </LinkButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default RegisterScreen;
