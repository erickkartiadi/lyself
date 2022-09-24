import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import BaseSearchBar from '../../components/bases/BaseSearchBar';
import AppointmentCard from '../../components/consult/AppointmentCard';
import PsychiatristCard from '../../components/consult/PsychiatristCard';
import SectionTitle from '../../components/SectionTitle';
import { styles } from '../../theme/styles';
import { Psychiatrist } from '../../types/types';
import { psychiatristData, upcomingAppointmentData } from '../../utils/constant/seed';

function ConsultScreen() {
  const renderTopPsychiatrist = ({
    item: {
      id,
      uri,
      experience,
      name,
      rating,
      specialty,
      otherSpecialties,
      patients,
      description,
      reviews,
      educations,
      place,
    },
  }: {
    item: Psychiatrist;
  }) => (
    <PsychiatristCard
      id={id}
      place={place}
      patients={patients}
      uri={uri}
      experience={experience}
      name={name}
      rating={rating}
      otherSpecialties={otherSpecialties}
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
      contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
      ListHeaderComponent={
        <>
          <BaseSearchBar placeholder="Find a psychiatrist" />

          {upcomingAppointmentData.length > 0 && (
            <View style={styles.sectionLarge}>
              <SectionTitle
                title="Upcoming Appointment"
                showRightComponent
                screen="Appointment"
              />
              <AppointmentCard {...upcomingAppointmentData[0]} isNearestAppointment />
            </View>
          )}
          <View style={{ marginTop: styles.sectionLarge.paddingVertical }}>
            <SectionTitle title="Top Psychiatrist" />
          </View>
        </>
      }
    />
  );
}
export default ConsultScreen;
