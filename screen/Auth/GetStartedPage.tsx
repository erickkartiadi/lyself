import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthRouteParamList, RootRouteParamList } from '../../types/routes';
import { styles } from '../../theme/styles';

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
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
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
            <Text h2>Start your mental health journey with</Text>
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
                paddingVertical: theme.spacing.xl,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: theme.colors.white,
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  position: 'absolute',
                  left: 28,
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
                borderColor: theme.colors.grey3,
                backgroundColor: theme.colors.cardBackground,
                paddingVertical: theme.spacing.xl,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: theme.colors.black,
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  position: 'absolute',
                  left: 28,
                }}
                type="ionicon"
                name="logo-google"
                color={theme.colors.brand.google.red}
              />
              CONTINUE WITH GOOGLE
            </Button>
            <Button
              type="outline"
              onPress={() => navigation.navigate('HomeRoutes')}
              fullWidth
              buttonStyle={{
                borderColor: theme.colors.grey3,
                backgroundColor: theme.colors.cardBackground,
                paddingVertical: theme.spacing.xl,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: theme.colors.black,
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  position: 'absolute',
                  left: 28,
                }}
                type="ionicon"
                name="logo-apple"
                color={theme.colors.brand.apple.black}
              />
              CONTINUE WITH APPLE
            </Button>
            <Button
              type="outline"
              onPress={() => navigation.navigate('HomeRoutes')}
              fullWidth
              buttonStyle={{
                borderColor: theme.colors.grey3,
                backgroundColor: theme.colors.cardBackground,
                paddingVertical: theme.spacing.xl,
              }}
              containerStyle={{ marginBottom: theme.spacing.xl }}
              titleStyle={{
                color: theme.colors.black,
                marginLeft: theme.spacing.xl,
              }}
            >
              <Icon
                containerStyle={{
                  position: 'absolute',
                  left: 28,
                }}
                type="ionicon"
                name="logo-facebook"
                color={theme.colors.brand.facebook.blue}
              />
              CONTINUE WITH FACEBOOK
            </Button>
          </View>
        </View>
        <Text style={{ textAlign: 'center' }}>
          <Text subtitle2>Didn&apos;t have an account? </Text>
          <Text
            bold
            subtitle2
            onPress={() => navigation.navigate('Register')}
            style={{
              color: theme.colors.primary,
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default GetStartedPage;
