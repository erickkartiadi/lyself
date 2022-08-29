import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Text, normalize, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colorAlpha from 'color-alpha';
import BaseIcon from '../../components/atoms/BaseIcon';
import { styles } from '../../theme/styles';
import SectionTitle from '../../components/organisms/SectionTitle';
import { ConsultStackParamList } from '../../navigation/param.types';
import ViewMoreText from '../../components/atoms/ViewMoreText';

export type PsychiatristScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Psychiatrist'
>;

function PsychiatristScreen({ route }: PsychiatristScreenNavigationProps) {
  const { experience, name, rating, specialty, uri, patients, description } =
    route.params;
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <View style={styles.section}>
        <Avatar
          source={{ uri }}
          size={120}
          rounded
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />
        <View>
          <Text h2>{name}</Text>
          <Text subtitle1 style={{ color: theme.colors.grey3 }}>
            {specialty}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: theme.spacing.xl,
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
              size={normalize(36)}
              iconSize={normalize(22)}
              iconType="ionicon"
              iconName="heart"
              backgroundColor={colorAlpha(theme.colors.primary, 0.25)}
              color={theme.colors.primary}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>{`${rating}%`}</Text>
              <Text subtitle2 style={{ color: theme.colors.grey3 }}>
                rating
              </Text>
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
              size={normalize(36)}
              iconSize={normalize(18)}
              iconType="ionicon"
              iconName="briefcase"
              backgroundColor={colorAlpha(theme.colors.yellow, 0.25)}
              color={theme.colors.yellow}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>{`${experience} yrs`}</Text>
              <Text subtitle2 style={{ color: theme.colors.grey3 }}>
                experience
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <BaseIcon
              size={normalize(36)}
              iconSize={normalize(22)}
              iconType="ionicon"
              iconName="people"
              backgroundColor={colorAlpha(theme.colors.blue, 0.25)}
              color={theme.colors.blue}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>{patients}</Text>
              <Text subtitle2 style={{ color: theme.colors.grey3 }}>
                patients
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionSmall}>
          <SectionTitle title="About me" />
          <ViewMoreText>{description}</ViewMoreText>
        </View>
      </View>
      <Button fullWidth>Make appointment</Button>
    </ScrollView>
  );
}

export default PsychiatristScreen;
