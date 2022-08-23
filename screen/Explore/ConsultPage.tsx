import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BaseSearchBar from '../../components/BaseSearchBar';
import SectionTitle from '../../components/SectionTitle';
import { styles } from '../../theme';
import AppointmentCard from '../../components/AppointmentCard';

function ConsultPage() {
  const scheduleData = {
    psychiatristName: 'Dr. Theresa Web',
    specialty: 'Children Psychiatry',
    date: 'Mon, 21 November',
    time: '13:00 - 14:30',
  };

  return (
    <ScrollView>
      <BaseSearchBar placeholder="Find a psychiatrist" />
      <View style={styles.containerSection}>
        <SectionTitle title="My Appointment" showRightButton />
        <AppointmentCard {...scheduleData} />
      </View>
    </ScrollView>
  );
}
export default ConsultPage;
