import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import BaseSearchBar from '../../components/bases/BaseSearchBar';
import AppointmentCard from '../../components/cards/AppointmentCard';
import PsychiatristCard, {
  PsychiatristCardProps,
} from '../../components/cards/PsychiatristCard';
import SectionTitle from '../../components/SectionTitle';
import { psychiatristData, scheduleData } from '../../constant/constant';
import { styles } from '../../theme/styles';

function ConsultScreen() {
  const renderTopPsychiatrist = ({
    item: {
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
      psychiatristLocation,
    },
  }: {
    item: PsychiatristCardProps;
  }) => (
    <PsychiatristCard
      psychiatristLocation={psychiatristLocation}
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
