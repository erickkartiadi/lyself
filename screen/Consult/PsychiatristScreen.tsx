import * as React from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Text, normalize, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colorAlpha from 'color-alpha';
import BaseIcon from '../../components/atoms/BaseIcon';
import { styles } from '../../theme/styles';
import SectionTitle from '../../components/organisms/SectionTitle';
import { ConsultStackParamList } from '../../navigation/param.types';
import ViewMoreText from '../../components/atoms/ViewMoreText';
import ViewSeparator from '../../components/atoms/BaseDivider';
import ReviewCard, {
  ReviewCardProps,
} from '../../components/organisms/ReviewCard';
import EducationCard, {
  EducationCardProps,
} from '../../components/organisms/EducationCard';

export type PsychiatristScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Psychiatrist'
>;

function PsychiatristScreen({ route }: PsychiatristScreenNavigationProps) {
  const {
    experience,
    name,
    rating,
    specialty,
    uri,
    patients,
    description,
    reviews,
    educations,
  } = route.params;
  const { theme } = useTheme();

  const renderReview = ({ item }: { item: ReviewCardProps }) => (
    <ReviewCard
      name={item.name}
      time={item.time}
      uri={item.uri}
      review={item.review}
    />
  );

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
        <View style={styles.sectionSmall}>
          <SectionTitle title="Reviews" />
          <FlatList
            horizontal
            overScrollMode="never"
            ItemSeparatorComponent={ViewSeparator}
            style={[styles.noContainerGutter, styles.flatListHorizontal]}
            contentContainerStyle={[
              styles.scrollViewContainer,
              styles.flatListHorizontalContainer,
            ]}
            showsHorizontalScrollIndicator={false}
            data={reviews}
            renderItem={renderReview}
          />
        </View>
        <View style={styles.sectionSmall}>
          <SectionTitle title="Education" />
          {educations
            .sort(
              (a: EducationCardProps, b: EducationCardProps) =>
                b.startYear - a.startYear
            )
            .map(
              ({
                id,
                institutionName,
                startYear,
                studyPeriod,
                uri: EducationCardUri,
              }) => (
                <EducationCard
                  id={id}
                  institutionName={institutionName}
                  startYear={startYear}
                  studyPeriod={studyPeriod}
                  uri={EducationCardUri}
                  key={institutionName}
                />
              )
            )}
        </View>
      </View>
      <Button fullWidth>Make appointment</Button>
    </ScrollView>
  );
}

export default PsychiatristScreen;
