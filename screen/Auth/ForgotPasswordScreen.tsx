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
import TextInput from '../../components/base/Input';
import { ForgotPasswordScreenNavigationProps } from '../../navigation/navigation.types';
import { forgotPassword } from '../../services/api/auth/auth.api';
import { styles } from '../../theme/styles';
import { User } from '../../types/types';
import { forgotPasswordSchema } from '../../utils/constant/validation/auth.schema';
import { somethingWentWrongToast } from '../../utils/toast';

type ForgotPasswordFormData = Pick<User, 'email'>;

function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenNavigationProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
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
  });

  const handleForgotPassword = async (forgotPasswordFormData: ForgotPasswordFormData) => {
    try {
      mutation.mutate(forgotPasswordFormData);
    } catch (error) {
      if (error) somethingWentWrongToast();
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
    >
      <SafeAreaView>
        <BackButton />
        <Text h1>Forgot Password?</Text>
        <Text>
          Please enter your email address, we&apos;ll send an email with instructions to
          reset your password.
        </Text>
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            alignItems: 'center',
          }}
        >
          <Image
            source={forgotPasswordIllustration}
            style={{
              flex: 1,
              width: '100%',
            }}
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
        <Button
          loading={mutation.isLoading}
          fullWidth
          onPress={handleSubmit(handleForgotPassword)}
        >
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPasswordScreen;
