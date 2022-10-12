import { Button, Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import getStartedIllustration from '../../assets/images/get-started-illustration.png';
import NavLink from '../../components/base/NavLink';
import { GetStartedScreenNavigationProps } from '../../navigation/navigation.types';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';

function GetStartedScreen({ navigation }: GetStartedScreenNavigationProps) {
  const { theme } = useTheme();

  return (
    <ScrollView style={appStyles.flex}>
      <SafeAreaView>
        <View
          style={[
            appStyles.sectionLarge,
            appStyles.flex,
            {
              minHeight: Dimensions.get('window').height,
            },
          ]}
        >
          <View
            style={[
              appStyles.noContainerGutter,
              {
                aspectRatio: 4 / 3,
              },
            ]}
          >
            <Image
              source={getStartedIllustration}
              style={[appStyles.flex, appStyles.w100]}
            />
          </View>
          <View style={[appStyles.container]}>
            <Text
              style={[
                appStyles.sectionLarge,
                {
                  textAlign: 'center',
                },
              ]}
            >
              <Text h1>Start your mental health journey with</Text>
              <Text h1 color={theme.colors.primary}>
                {' '}
                Lyself
              </Text>
            </Text>
            <View
              style={[
                appStyles.sectionLarge,
                appStyles.flex,
                {
                  justifyContent: 'center',
                },
              ]}
            >
              <Button
                onPress={() => navigation.navigate('Login')}
                buttonStyle={spacing.py_xl}
                containerStyle={spacing.mb_xl}
                titleStyle={[
                  spacing.ml_xl,
                  {
                    color: theme.colors.white,
                  },
                ]}
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
                buttonStyle={[
                  spacing.py_xl,
                  {
                    borderColor: theme.colors.greyOutline,
                  },
                ]}
                containerStyle={spacing.mb_xl}
                titleStyle={[
                  spacing.ml_xl,
                  {
                    color: theme.colors.black,
                  },
                ]}
              >
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    left: 28,
                  }}
                  type="ionicon"
                  name="logo-apple"
                  color={theme.colors.apple}
                />
                CONTINUE WITH APPLE
              </Button>
              <Button
                type="outline"
                buttonStyle={[
                  spacing.py_xl,
                  {
                    borderColor: theme.colors.greyOutline,
                  },
                ]}
                containerStyle={spacing.mb_xl}
                titleStyle={[
                  spacing.ml_xl,
                  {
                    color: theme.colors.black,
                  },
                ]}
              >
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    left: 28,
                  }}
                  type="ionicon"
                  name="logo-google"
                  color={theme.colors.google}
                />
                CONTINUE WITH GOOGLE
              </Button>

              <Button
                type="outline"
                buttonStyle={[
                  spacing.py_xl,
                  {
                    borderColor: theme.colors.greyOutline,
                  },
                ]}
                containerStyle={spacing.mb_xl}
                titleStyle={[
                  spacing.ml_xl,
                  {
                    color: theme.colors.black,
                  },
                ]}
              >
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    left: 28,
                  }}
                  type="ionicon"
                  name="logo-facebook"
                  color={theme.colors.facebook}
                />
                CONTINUE WITH FACEBOOK
              </Button>
            </View>
          </View>
          <View
            style={[
              appStyles.sectionLarge,
              appStyles.flexDirRow,
              appStyles.alignCenter,
              appStyles.justifyCenter,
            ]}
          >
            <Text>Didn&apos;t have an account? </Text>
            <NavLink to={{ screen: 'Register' }} color="primary">
              Sign Up
            </NavLink>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default GetStartedScreen;
