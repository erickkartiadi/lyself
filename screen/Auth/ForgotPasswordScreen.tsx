import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@rneui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';
import BackButton from '../../components/base/BackButton';
import TextInput from '../../components/base/TextInput';
import { ForgotPasswordScreenNavigationProps } from '../../navigation/navigation.types';
import { ForgotPasswordDto } from '../../services/api/auth/auth.api';
import { useForgotPassword } from '../../services/api/auth/auth.hooks';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import { forgotPasswordSchema } from '../../utils/constant/validation/auth.schema';

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

  const forgotPasswordMutation = useForgotPassword();
  const handleForgotPassword = async (forgotPasswordFormData: ForgotPasswordDto) => {
    forgotPasswordMutation.mutate(forgotPasswordFormData, {
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
        <Text h1>Forgot Password?</Text>
        <Text>
          Please enter your email address, we&apos;ll send an email with instructions to
          reset your password.
        </Text>
        <View style={[layout.flex, layout.align_center, layout.ratio_square]}>
          <Image source={forgotPasswordIllustration} style={[layout.flex, width.w_100]} />
        </View>
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
        <Button
          loading={forgotPasswordMutation.isLoading}
          onPress={handleSubmit(handleForgotPassword)}
        >
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPasswordScreen;
