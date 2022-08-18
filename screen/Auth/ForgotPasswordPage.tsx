import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/index';
import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';
import ButtonBack from '../../components/ButtonBack';
import { InputText } from '../../components/form/Input';

export type ForgotPasswordProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Login'
>;

function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <SafeAreaView
        style={[
          styles.containerSection,
          {
            paddingVertical: theme.spacing.xl,
          },
        ]}
      >
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
export default ForgotPassword;
