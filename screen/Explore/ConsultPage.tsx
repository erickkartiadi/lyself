import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BaseSearchBar from '../../components/BaseSearchBar';
import SectionTitle from '../../components/SectionTitle';
import { styles } from '../../theme';
import AppointmentCard from '../../components/AppointmentCard';
import PsychiatristCard, {
  PsychiatristCardProps,
} from '../../components/PsychiatristCard';

export const psychiatristData = [
  {
    uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 years',
    rating: '100',
    specialty: 'Addiction Psychiatry',
    name: 'Dr. Usman Yousaf',
  },
  {
    uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '3 years',
    rating: '98',
    specialty: 'Neuropsychiatry',
    name: 'Dr. Austin Distel',
  },
  {
    uri: 'https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '5 years',
    rating: '90',
    specialty: 'Neuropsychiatry',
    name: 'Dr. Kirstin Watson',
  },
  {
    uri: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 years',
    rating: '99',
    name: 'Dr. Bruno Rodrigues',
    specialty: 'Forensic Psychiatry',
  },
  {
    uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '2 years',
    rating: '95',
    specialty: 'Old age psychiatry',
    name: 'Dr. Floyd Miles',
  },
];

function ConsultPage() {
  const scheduleData = {
    psychiatristName: 'Dr. Theresa Web',
    specialty: 'Addiction Psychiatry',
    date: 'Mon, 21 November',
    time: '13:00 - 14:30',
  };

  const renderTopPsychiatrist = ({
    item: { uri, experience, name, rating, specialty },
  }: {
    item: PsychiatristCardProps;
  }) => (
    <PsychiatristCard
      uri={uri}
      experience={experience}
      name={name}
      rating={rating}
      specialty={specialty}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatList}
      data={psychiatristData}
      renderItem={renderTopPsychiatrist}
      ListHeaderComponent={
        <>
          <View style={styles.containerSectionVerticalDistance}>
            <BaseSearchBar
              enablePadding={false}
              placeholder="Find a psychiatrist"
            />
            <SectionTitle title="My Appointment" showRightButton />
            <AppointmentCard {...scheduleData} />
          </View>
          <View
            style={{
              marginTop: styles.containerSectionVerticalDistance.marginVertical,
            }}
          >
            <SectionTitle title="Top Psychiatrist" />
          </View>
        </>
      }
    />
  );
}
export default ConsultPage;
