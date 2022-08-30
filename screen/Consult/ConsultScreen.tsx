import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BaseSearchBar from '../../components/atoms/BaseSearchBar';

import SectionTitle from '../../components/organisms/SectionTitle';
import { styles } from '../../theme/styles';
import AppointmentCard from '../../components/organisms/AppointmentCard';
import PsychiatristCard, {
  PsychiatristCardProps,
} from '../../components/organisms/PsychiatristCard';
import { psychiatristData, scheduleData } from '../../constant';

function ConsultScreen() {
  const renderTopPsychiatrist = ({
    item: {
      uri,
      experience,
      name,
      rating,
      specialty,
      patients,
      description,
      reviews,
      educations,
    },
  }: {
    item: PsychiatristCardProps;
  }) => (
    <PsychiatristCard
      patients={patients}
      uri={uri}
      experience={experience}
      name={name}
      rating={rating}
      specialty={specialty}
      description={description}
      reviews={reviews}
      educations={educations}
    />
  );

  return (
    <FlatList
      data={psychiatristData}
      renderItem={renderTopPsychiatrist}
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
      ListHeaderComponent={
        <>
          <BaseSearchBar placeholder="Find a psychiatrist" />
          <View style={styles.section}>
            <SectionTitle title="My Appointment" showRightButton />
            <AppointmentCard {...scheduleData} />
          </View>
          <View style={{ marginTop: styles.section.paddingVertical }}>
            <SectionTitle title="Top Psychiatrist" />
          </View>
        </>
      }
    />
  );
}
export default ConsultScreen;