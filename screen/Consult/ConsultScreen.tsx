import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import BaseSearchBar from '../../components/bases/BaseSearchBar';
import AppointmentCard from '../../components/cards/AppointmentCard';
import PsychiatristCard from '../../components/cards/PsychiatristCard';
import SectionTitle from '../../components/SectionTitle';
import { appointmentData, psychiatristData } from '../../constant/constant';
import { styles } from '../../theme/styles';
import { Psychiatrist } from '../../types/types';

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
      contentContainerStyle={[styles.containerGutter, styles.section]}
      ListHeaderComponent={
        <>
          <BaseSearchBar placeholder="Find a psychiatrist" />
          <View style={styles.section}>
            <SectionTitle
              title="My Appointment"
              showRightButton
              screen="Appointment"
            />
            <AppointmentCard {...appointmentData[0]} />
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
