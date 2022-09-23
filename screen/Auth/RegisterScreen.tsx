import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
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
import { register } from '../../services/api/lyself/auth';
import { styles } from '../../theme/styles';
import { RegisterScreenNavigationProps } from '../../types/navigation.types';
import { User } from '../../types/types';
import { registerSchema } from '../../utils/constant/validation/auth.schema';
import { somethingWentWrongToast } from '../../utils/toast';

type RegisterFormData = Omit<User, 'id'>;

function RegisterScreen({ navigation }: RegisterScreenNavigationProps) {
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

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({ email, name, password }: RegisterFormData) => {
    setIsLoading(true);

    try {
      await register({ email, name, password });

      Toast.show({
        type: 'success',
        text1: 'Email confirmation sent',
        text2: `We have sent you a confirmation email to ${email}, please confirm your email address.`,
      });
      navigation.navigate('Login');

      reset();
    } catch (error) {
      if (error) somethingWentWrongToast();
    }

    setIsLoading(false);
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
        <Button loading={isLoading} fullWidth onPress={handleSubmit(handleRegister)}>
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
