import * as React from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  Image,
  Text,
  normalize,
  useTheme,
} from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colorAlpha from 'color-alpha';
import * as Linking from 'expo-linking';
import BaseIcon from '../../components/atoms/BaseIcon';
import { BORDER_RADIUS, styles } from '../../theme/styles';
import SectionTitle from '../../components/organisms/SectionTitle';
import { ConsultStackParamList } from '../../navigation/param.types';
import ViewMoreText from '../../components/organisms/ViewMoreText';
import ViewSeparator from '../../components/atoms/BaseDivider';
import ReviewCard, {
  ReviewCardProps,
} from '../../components/organisms/ReviewCard';
import EducationCard, {
  EducationCardProps,
} from '../../components/organisms/EducationCard';
import Label from '../../components/atoms/Label';
import BaseLink from '../../components/atoms/BaseLink';

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
    otherSpecialties,
    uri,
    patients,
    description,
    reviews,
    educations,
    psychiatristLocation,
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
    <View style={{ flex: 1 }}>
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={[styles.containerGutter]}
        showsVerticalScrollIndicator={false}
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
                styles.containerGutter,
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
          <View style={styles.sectionSmall}>
            <SectionTitle title="Other Specialties" />
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {otherSpecialties
                .filter(
                  (value, index, array) =>
                    value !== specialty && array.indexOf(value) === index
                )
                .map((each) => (
                  <Label key={each}>{each}</Label>
                ))}
            </View>
          </View>
          <View style={styles.sectionSmall}>
            <SectionTitle title="Location" />
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  width: 100,
                  borderRadius: BORDER_RADIUS.md,
                  borderWidth: theme.spacing.xs,
                  borderColor: theme.colors.grey4,
                  marginRight: theme.spacing.xl,
                }}
                source={{ uri: psychiatristLocation.uri }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  h4
                  h4Style={{
                    textTransform: 'capitalize',
                    flex: 1,
                    marginBottom: 0,
                  }}
                >
                  {psychiatristLocation.name}
                </Text>
                <Text
                  subtitle2
                  style={{
                    textTransform: 'capitalize',
                    flex: 1,
                  }}
                >
                  {psychiatristLocation.address}
                </Text>
                <BaseLink
                  color="primary"
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com/maps/search/${psychiatristLocation.name}`
                    )
                  }
                >
                  Open in Google Maps
                </BaseLink>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.containerGutter, styles.sectionSmall]}>
        <Button fullWidth>Make appointment</Button>
      </View>
    </View>
  );
}

export default PsychiatristScreen;
