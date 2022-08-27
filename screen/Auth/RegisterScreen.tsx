import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBack from '../../components/atoms/ButtonBack';

import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/styles';
import registerIllustration from '../../assets/images/register-illustration.png';
import { InputPassword, InputText } from '../../components/atoms/Input';

export type RegisterScreenProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Register'
>;

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <SafeAreaView>
        <ButtonBack onPress={() => navigation.navigate('Login')} />
        <Text h1 bold>
          Create new account
        </Text>
        <Text>
          Just one more step to be part of the {'\n'}Lyself community.
        </Text>
        <View
          style={{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={registerIllustration}
            style={{
              flex: 1,
              width: '80%',
            }}
            resizeMode="center"
          />
        </View>
        <InputText label="Name" placeholder="eg. John Doe" />
        <InputText label="Email address" placeholder="example@email.com" />
        <InputPassword />
        <Button fullWidth onPress={() => navigation.navigate('Login')}>
          Create Account
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.xl * 2,
          }}
        >
          <Text subtitle2>Already have an account? </Text>
          <Text
            bold
            subtitle2
            onPress={() => navigation.navigate('Login')}
            style={{
              color: theme.colors.primary,
            }}
          >
            Login{' '}
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default RegisterScreen;
