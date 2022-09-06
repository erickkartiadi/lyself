import { Button, normalize, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import BaseAvatar from '../../components/bases/BaseAvatar';
import BaseIcon from '../../components/bases/BaseIcon';
import BaseLabel from '../../components/bases/BaseLabel';
import BaseLink from '../../components/bases/BaseLink';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import EducationCard from '../../components/consult/EducationCard';
import ReviewCard from '../../components/consult/ReviewCard';
import SectionTitle from '../../components/SectionTitle';
import ShowHideText from '../../components/ShowHideText';
import { styles } from '../../theme/styles';
import { PsychiatristScreenNavigationProps } from '../../types/navigation.types';
import { Education, Review } from '../../types/types';

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
    place,
  } = route.params;

  const { theme } = useTheme();

  const renderReview = ({ item }: { item: Review }) => (
    <ReviewCard
      id={item.id}
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
          <BaseAvatar
            source={{ uri }}
            size={7}
            rounded
            containerStyle={{ marginBottom: theme.spacing.xl }}
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
                width={36}
                size={22}
                type="ionicon"
                name="heart"
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
                width={36}
                size={18}
                type="ionicon"
                name="briefcase"
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
                width={normalize(36)}
                size={normalize(22)}
                type="ionicon"
                name="people"
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
          <View style={styles.sectionMedium}>
            <SectionTitle title="About me" />
            <ShowHideText>{description}</ShowHideText>
          </View>
          <View style={styles.sectionMedium}>
            <SectionTitle title="Reviews" />
            <FlatList
              horizontal
              overScrollMode="never"
              ItemSeparatorComponent={BaseViewSeparator}
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
          <View style={styles.sectionMedium}>
            <SectionTitle title="Education" />
            {educations
              .sort((a: Education, b: Education) => b.startYear - a.startYear)
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
          <View style={styles.sectionMedium}>
            <SectionTitle title="Other Specialties" />
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {otherSpecialties
                .filter(
                  (value, index, array) =>
                    value !== specialty && array.indexOf(value) === index
                )
                .map((each) => (
                  <BaseLabel key={each}>{each}</BaseLabel>
                ))}
            </View>
          </View>
          <View style={styles.sectionMedium}>
            <SectionTitle title="Location" />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: theme.spacing.md,
              }}
            >
              <BaseAvatar
                size={6}
                containerStyle={{
                  marginRight: theme.spacing.xl,
                }}
                source={{ uri: place.uri }}
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
                  {place.name}
                </Text>
                <Text
                  subtitle2
                  style={{
                    textTransform: 'capitalize',
                    flex: 1,
                  }}
                >
                  {place.address}
                </Text>
                <BaseLink
                  color="primary"
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    Linking.openURL(`https://www.google.com/maps/search/${place.name}`)
                  }
                >
                  Open in Google Maps
                </BaseLink>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.containerGutter, styles.section]}>
        <Button fullWidth>Make appointment</Button>
      </View>
    </View>
  );
}

export default PsychiatristScreen;
