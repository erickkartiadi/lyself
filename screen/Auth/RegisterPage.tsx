import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, View } from 'react-native';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme';
import useToggle from '../../utils/hooks/useToggle';
import registerIllustration from '../../assets/images/register-illustration.png';

export type RegisterPageProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Register'
>;

function RegisterPage({ navigation }: RegisterPageProps) {
  const { theme } = useTheme();
  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);

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
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Name"
          placeholder="eg. John Doe"
        />
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Email address"
          placeholder="example@email.com"
        />
        <Input
          labelStyle={{ color: theme.colors.black }}
          selectionColor={theme.colors.primary}
          inputContainerStyle={{ borderColor: theme.colors.grey3 }}
          label="Password"
          placeholder="must have at least 8 characters"
          secureTextEntry={!isPasswordVisible}
          rightIcon={
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              type="ionicon"
              size={24}
              iconStyle={{ padding: theme.spacing.sm }}
              color={theme.colors.black}
              onPress={() => togglePasswordVisible()}
            />
          }
        />
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
export default RegisterPage;
