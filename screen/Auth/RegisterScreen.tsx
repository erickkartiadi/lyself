import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBack from '../../components/atoms/ButtonBack';

import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/styles';
import registerIllustration from '../../assets/images/register-illustration.png';
import { InputPassword, InputText } from '../../components/atoms/Input';
import LinkButton from '../../components/atoms/LinkButton';

export type RegisterScreenProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Register'
>;

function RegisterScreen({ navigation }: RegisterScreenProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <SafeAreaView>
        <ButtonBack onPress={() => navigation.navigate('Login')} />
        <Text h1>Create new account</Text>
        <Text>
          Just one more step to be part of the {'\n'}Lyself community.
        </Text>
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
        <InputText label="Name" placeholder="eg. John Doe" />
        <InputText label="Email address" placeholder="example@email.com" />
        <InputPassword />
        <Button fullWidth onPress={() => navigation.navigate('Login')}>
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
          <Text subtitle2>Already have an account? </Text>
          <LinkButton to={{ screen: 'Login' }} color="primary">
            Login
          </LinkButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
export default RegisterScreen;
