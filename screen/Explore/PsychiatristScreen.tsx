import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Text, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colorAlpha from 'color-alpha';
import { ExploreRouteParamList } from '../../types/routes';
import { styles } from '../../theme/styles';
import SectionTitle from '../../components/SectionTitle';
import BaseIcon from '../../components/BaseIcon';

export type PsychiatristScreenProps = NativeStackScreenProps<
  ExploreRouteParamList,
  'Psychiatrist'
>;

function PsychiatristScreen({ route }: PsychiatristScreenProps) {
  const { experience, name, rating, specialty, uri } = route.params;
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <View style={{ backgroundColor: theme.colors.background }}>
        <Avatar
          source={{ uri }}
          size={100}
          rounded
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />
        <View>
          <Text h2 bold>
            {name}
          </Text>
          <Text subtitle1 style={{ color: theme.colors.grey3 }}>
            {specialty}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: theme.spacing.xl,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: theme.spacing.xl * 1.5,
            }}
          >
            <BaseIcon
              size={36}
              iconSize={24}
              iconType="ionicon"
              iconName="heart"
              backgroundColor={colorAlpha(theme.colors.primary, 0.25)}
              color={theme.colors.primary}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1 bold>
                {`${rating}%`}
              </Text>
              <Text caption>rating</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: theme.spacing.xl * 1.5,
            }}
          >
            <BaseIcon
              size={36}
              iconSize={18}
              iconType="ionicon"
              iconName="briefcase"
              backgroundColor={colorAlpha(theme.colors.yellow, 0.25)}
              color={theme.colors.yellow}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1 bold>
                {`${experience}`}
              </Text>
              <Text caption>experience</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <BaseIcon
              size={36}
              iconSize={24}
              iconType="ionicon"
              iconName="people"
              backgroundColor={colorAlpha(theme.colors.blue, 0.25)}
              color={theme.colors.blue}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1 bold>
                98
              </Text>
              <Text caption>patients</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <SectionTitle title="About doctor" />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          voluptas debitis vitae maxime asperiores ducimus dolore iste, quasi
          vero esse.
        </Text>
      </View>
      <Button fullWidth>Make appointment</Button>
    </ScrollView>
  );
}

export default PsychiatristScreen;
