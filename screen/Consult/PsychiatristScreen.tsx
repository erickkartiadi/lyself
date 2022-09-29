import { FAB, Icon, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Avatar from '../../components/base/Avatar';
import Card from '../../components/base/Card';
import ButtonLink from '../../components/base/Link';
import ShowHideText from '../../components/base/ShowHideText';
import EducationCard from '../../components/consult/EducationCard';
import ReviewCard from '../../components/consult/ReviewCard';
import HorizontalSeparator from '../../components/layout/HorizontalSeparator';
import SectionTitle from '../../components/layout/SectionTitle';
import { BORDER_RADIUS, GUTTER_SIZE, styles } from '../../theme/styles';
import { PsychiatristScreenNavigationProps } from '../../types/navigation.types';
import { Education, Review } from '../../types/types';
import colorAlpha from '../../utils/colorAlpha';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';
import normalize from '../../utils/normalize';

function PsychiatristScreen({ route, navigation }: PsychiatristScreenNavigationProps) {
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

  useApplyHeaderWorkaround(navigation.setOptions);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={[styles.containerGutter, { paddingBottom: normalize(96) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionLarge}>
          <Avatar
            source={{ uri }}
            size={7}
            rounded
            containerStyle={{ marginBottom: theme.spacing.xl }}
          />
          <View>
            <Text h1>{name}</Text>
            <Text subtitle color={theme.colors.grey3}>
              {specialty}
            </Text>
          </View>
          <View
            style={[
              styles.sectionLarge,
              {
                flex: 1,
                flexDirection: 'row',
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: theme.spacing.xl,
              }}
            >
              <Icon
                name="heart"
                type="ionicon"
                size={normalize(26)}
                color={theme.colors.primary}
                containerStyle={{
                  padding: theme.spacing.md,
                  borderRadius: BORDER_RADIUS.rounded,
                  marginRight: theme.spacing.md,
                  backgroundColor: colorAlpha(theme.colors.primary, 0.25),
                }}
              />
              <View>
                <Text subtitle>{`${rating}%`}</Text>
                <Text small color={theme.colors.grey3}>
                  rating
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: theme.spacing.xl,
              }}
            >
              <Icon
                name="work"
                type="material-icon"
                size={normalize(26)}
                color={theme.colors.warning}
                containerStyle={{
                  padding: theme.spacing.md,
                  borderRadius: BORDER_RADIUS.rounded,
                  marginRight: theme.spacing.md,
                  backgroundColor: colorAlpha(theme.colors.warning, 0.25),
                }}
              />
              <View>
                <Text subtitle>{`${experience} yrs`}</Text>
                <Text small color={theme.colors.grey3}>
                  experience
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: theme.spacing.xl,
              }}
            >
              <Icon
                name="people"
                type="ionicon"
                size={normalize(26)}
                color={theme.colors.blue}
                containerStyle={{
                  padding: theme.spacing.md,
                  borderRadius: BORDER_RADIUS.rounded,
                  marginRight: theme.spacing.md,
                  backgroundColor: colorAlpha(theme.colors.blue, 0.25),
                }}
              />
              <View>
                <Text subtitle>{`${patients}`}</Text>
                <Text small color={theme.colors.grey3}>
                  patients
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.sectionMedium}>
            <SectionTitle title="About me" />
            <ShowHideText>{description}</ShowHideText>
          </View>
          <View style={styles.sectionMedium}>
            <SectionTitle title="Reviews" />
            <FlatList
              horizontal
              overScrollMode="never"
              ItemSeparatorComponent={HorizontalSeparator}
              style={[styles.noContainerGutter]}
              contentContainerStyle={[styles.containerGutter]}
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
            <SectionTitle title="Location" />
            <Card containerStyle={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Avatar
                  size={6}
                  containerStyle={{
                    marginRight: theme.spacing.xl,
                  }}
                  source={{ uri: place.uri }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    subtitle
                    style={{
                      textTransform: 'capitalize',
                      flex: 1,
                      marginBottom: 0,
                    }}
                  >
                    {place.name}
                  </Text>
                  <Text
                    small
                    style={{
                      textTransform: 'capitalize',
                      flex: 1,
                    }}
                  >
                    {place.address}
                  </Text>
                  <ButtonLink
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
                  </ButtonLink>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      <FAB
        color={theme.colors.primary}
        title="MAKE APPOINTMENT"
        buttonStyle={{ borderRadius: BORDER_RADIUS.rounded }}
        containerStyle={{ flex: 1, elevation: 0, padding: GUTTER_SIZE }}
        style={{ position: 'absolute', bottom: 0 }}
      />
    </View>
  );
}

export default PsychiatristScreen;
