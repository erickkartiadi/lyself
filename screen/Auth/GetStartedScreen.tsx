import { Icon } from '@rneui/base';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../theme/styles';
import getStartedIllustration from '../../assets/images/get-started-illustration.png';
import LinkButton from '../../components/atoms/LinkButton';
import { GetStartedScreenNavigationProps } from '../../navigation/navigation.types';

function GetStartedScreen({ navigation }: GetStartedScreenNavigationProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
        },
      ]}
    >
      <SafeAreaView>
        <View
          style={[
            styles.section,
            {
              flex: 1,
              minHeight: Dimensions.get('window').height,
            },
          ]}
        >
          <View
            style={[
              styles.noContainerGutter,
              {
                aspectRatio: 4 / 3,
              },
            ]}
          >
            <Image
              source={getStartedIllustration}
              style={[
                {
                  width: '100%',
                  flex: 1,
                },
              ]}
            />
          </View>
          <View style={[styles.container]}>
            <Text
              style={[
                styles.section,
                {
                  textAlign: 'center',
                },
              ]}
            >
              <Text h1>Start your mental health journey with</Text>
              <Text h1 h1Style={{ color: theme.colors.primary }}>
                {' '}
                Lyself
              </Text>
            </Text>
            <View
              style={[
                styles.section,
                {
                  flex: 1,
                  justifyContent: 'center',
                },
              ]}
            >
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
                onPress={() =>
                  navigation.navigate('HomeTab', { screen: 'Home' })
                }
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
                onPress={() =>
                  navigation.navigate('HomeTab', { screen: 'Home' })
                }
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
                onPress={() =>
                  navigation.navigate('HomeTab', { screen: 'Home' })
                }
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
            <Text>Didn&apos;t have an account? </Text>
            <LinkButton to={{ screen: 'Register' }} color="primary">
              Sign Up
            </LinkButton>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default GetStartedScreen;
