import React from 'react';
import { Button, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBack from '../../components/atoms/ButtonBack';
import { styles } from '../../theme/styles';
import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';
import { TextInput } from '../../components/atoms/Input';
import { ForgotPasswordScreenNavigationProps } from '../../navigation/navigation.types';

function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenNavigationProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.containerGutter, styles.section]}
    >
      <SafeAreaView>
        <ButtonBack />
        <Text h1>Forgot Password?</Text>
        <Text>
          Please enter your email address, we&apos;ll send an email with
          instructions to reset your password.
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
        <TextInput label="Email address" placeholder="example@email.com" />
        <Button fullWidth onPress={() => navigation.navigate('Login')}>
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPasswordScreen;
