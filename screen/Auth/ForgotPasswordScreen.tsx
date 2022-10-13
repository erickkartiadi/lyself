import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';
import BackButton from '../../components/base/BackButton';
import TextInput from '../../components/base/TextInput';
import { ForgotPasswordScreenNavigationProps } from '../../navigation/navigation.types';
import { forgotPassword, ForgotPasswordDto } from '../../services/api/auth/auth.api';
import layout from '../../styles/layout';
import { forgotPasswordSchema } from '../../utils/constant/validation/auth.schema';
import { somethingWentWrongToast } from '../../utils/toast';

function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenNavigationProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordDto>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const mutation = useMutation(forgotPassword, {
    onSuccess: (email) => {
      Toast.show({
        type: 'success',
        text1: 'Email sent',
        text2: `We have sent you a reset password email to ${email}. Please check your inbox.`,
        visibilityTime: 10000,
      });
      navigation.navigate('Login');
      reset();
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });

  const handleForgotPassword = async (forgotPasswordFormData: ForgotPasswordDto) => {
    mutation.mutate(forgotPasswordFormData);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[layout.containerGutter, layout.sectionLarge]}
    >
      <SafeAreaView>
        <BackButton />
        <Text h1>Forgot Password?</Text>
        <Text>
          Please enter your email address, we&apos;ll send an email with instructions to
          reset your password.
        </Text>
        <View style={[layout.flex, layout.alignCenter, layout.aspectRatioSquare]}>
          <Image source={forgotPasswordIllustration} style={[layout.flex, layout.w100]} />
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
        <Button loading={mutation.isLoading} onPress={handleSubmit(handleForgotPassword)}>
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPasswordScreen;
