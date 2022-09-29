import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import SearchBar from '../../components/base/SearchBar';
import AppointmentCard from '../../components/consult/AppointmentCard';
import PsychiatristCard from '../../components/consult/PsychiatristCard';
import SectionTitle from '../../components/layout/SectionTitle';
import VerticalSeparator from '../../components/layout/VerticalSeparator';
import { styles } from '../../theme/styles';
import { ConsultScreenNavigationProps } from '../../types/navigation.types';
import { Psychiatrist } from '../../types/types';
import { psychiatristData, upcomingAppointmentData } from '../../utils/constant/seed';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function ConsultScreen({ navigation }: ConsultScreenNavigationProps) {
  const renderTopPsychiatrist = ({
    item: {
      id,
      uri,
      experience,
      name,
      rating,
      specialty,
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
      specialty={specialty}
      description={description}
      reviews={reviews}
      educations={educations}
    />
  );

  useApplyHeaderWorkaround(navigation.setOptions);

  return (
    <FlatList
      data={psychiatristData}
      renderItem={renderTopPsychiatrist}
      ItemSeparatorComponent={VerticalSeparator}
      contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
      ListHeaderComponent={
        <>
          <SearchBar placeholder="Find a psychiatrist" />

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
