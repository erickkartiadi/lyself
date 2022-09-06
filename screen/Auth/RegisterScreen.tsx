import { Button, Text } from '@rneui/themed';
import React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import registerIllustration from '../../assets/images/register-illustration.png';
import BackButton from '../../components/BackButton';
import TextInput from '../../components/forms/Input';
import PasswordInput from '../../components/forms/PasswordInput';
import LinkButton from '../../components/LinkButton';
import { styles } from '../../theme/styles';
import { RegisterScreenNavigationProps } from '../../types/navigation.types';

function RegisterScreen({ navigation }: RegisterScreenNavigationProps) {
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
        <TextInput label="Name" placeholder="eg. John Doe" />
        <TextInput label="Email address" placeholder="example@email.com" />
        <PasswordInput label="Password" placeholder="must have at least 8 characters" />
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
