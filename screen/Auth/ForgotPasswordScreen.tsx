import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBack from '../../components/atoms/ButtonBack';

import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/styles';

import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';
import { InputText } from '../../components/atoms/Input';

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Login'
>;

function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <SafeAreaView>
        <ButtonBack onPress={() => navigation.navigate('Login')} />
        <Text h1 bold>
          Forgot Password?
        </Text>
        <Text>
          Please enter your email address, we&apos;ll send an email with
          instructions to reset your password.
        </Text>
        <View style={{ flex: 1, height: 360, alignItems: 'center' }}>
          <Image
            source={forgotPasswordIllustration}
            style={{
              flex: 1,
              width: '100%',
            }}
          />
        </View>
        <InputText label="Email address" placeholder="example@email.com" />
        <Button fullWidth onPress={() => navigation.navigate('Login')}>
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPasswordScreen;
