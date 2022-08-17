import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/index';
import forgotPasswordIllustration from '../../assets/images/forgot-password-illustration.png';

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
        <Button
          type="outline"
          onPress={() => navigation.navigate('Login')}
          containerStyle={{
            alignSelf: 'flex-start',
            marginBottom: theme.spacing.lg,
          }}
          buttonStyle={{ padding: 10, paddingHorizontal: 10 }}
        >
          <Icon
            size={20}
            name="arrow-back-outline"
            type="ionicon"
            containerStyle={{ aspectRatio: 1, padding: 0 }}
          />
        </Button>
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
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Email address"
          placeholder="example@email.com"
        />
        <Button fullWidth onPress={() => navigation.navigate('Login')}>
          Send Instruction
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
export default ForgotPassword;
