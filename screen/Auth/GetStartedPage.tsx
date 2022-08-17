import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme';
import getStartedIllustration from '../../assets/images/get-started-illustration.png';

export type GetStartedPageProps = NativeStackScreenProps<
  AuthRouteParamList & RootRouteParamList,
  'Register'
>;

function GetStartedPage({ navigation }: GetStartedPageProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={{
        minHeight: Dimensions.get('window').height,
        paddingBottom: theme.spacing.xl,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        ]}
      >
        <Image
          source={getStartedIllustration}
          style={[
            {
              flex: 1,
              width: '100%',
              marginBottom: theme.spacing.xl * -4,
            },
          ]}
        />
        <View style={styles.container}>
          <Text
            style={{
              marginBottom: theme.spacing.xl * 3,
              textAlign: 'center',
            }}
          >
            <Text h2 h2Style={{ color: theme.colors.textColor }}>
              Start your mental health journey with
            </Text>
            <Text h2 h2Style={{ color: theme.colors.primary }}>
              {' '}
              Lyself
            </Text>
          </Text>
          <View>
            <Button
              onPress={() => navigation.navigate('Login')}
              fullWidth
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                paddingVertical: theme.spacing.xl,
                borderColor: theme.colors.grey3,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: theme.colors.white,
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  flexDirection: 'row',
                  marginLeft: theme.spacing.xl,
                  position: 'absolute',
                  left: theme.spacing.sm,
                }}
                type="ionicon"
                name="mail"
                color={theme.colors.white}
              />
              CONTINUE WITH EMAIL
            </Button>
            <Button
              type="outline"
              onPress={() => navigation.navigate('HomeRoutes')}
              fullWidth
              buttonStyle={{
                backgroundColor: '#FFFFFF',
                paddingVertical: theme.spacing.xl,
                borderColor: theme.colors.grey3,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: '#000000',
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  flexDirection: 'row',
                  marginLeft: theme.spacing.xl,
                  position: 'absolute',
                  left: theme.spacing.sm,
                }}
                type="ionicon"
                name="logo-google"
                color={theme.colors.brand.google}
              />
              Continue with Google
            </Button>
            <Button
              onPress={() => navigation.navigate('HomeRoutes')}
              fullWidth
              buttonStyle={{
                backgroundColor: theme.colors.brand.facebook,
                paddingVertical: theme.spacing.xl,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: '#FFFFFF',
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  flexDirection: 'row',
                  marginLeft: theme.spacing.xl,
                  position: 'absolute',
                  left: theme.spacing.sm,
                }}
                type="ionicon"
                name="logo-facebook"
                color="#FFFFFF"
              />
              Continue with Facebook
            </Button>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: theme.spacing.xl,
        }}
      >
        <Text subtitle2>Didn&apos;t have an account? </Text>
        <Text
          bold
          subtitle2
          onPress={() => navigation.navigate('Register')}
          style={{
            color: theme.colors.primary,
          }}
        >
          Sign Up{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default GetStartedPage;
