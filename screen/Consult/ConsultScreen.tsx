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
import generateRandomNumber from '../../utils/generateRandomNumber';
import lorem from '../../utils/genereateLoremIpsum';

export const psychiatristData = [
  {
    uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    specialty: 'Addiction Psychiatry',
    name: 'Dr. Usman Yousaf',
    description: lorem.generateParagraphs(1),
  },
  {
    uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    specialty: 'Neuropsychiatry',
    name: 'Dr. Austin Distel',
    description: lorem.generateParagraphs(1),
  },
  {
    uri: 'https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    specialty: 'Neuropsychiatry',
    name: 'Dr. Kirstin Watson',
    description: lorem.generateParagraphs(1),
  },
  {
    uri: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Bruno Rodrigues',
    specialty: 'Forensic Psychiatry',
    description: lorem.generateParagraphs(1),
  },
  {
    uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    specialty: 'Old age psychiatry',
    name: 'Dr. Floyd Miles',
    description: lorem.generateParagraphs(1),
  },
];

function ConsultScreen() {
  const scheduleData = {
    psychiatristName: 'Dr. Theresa Web',
    specialty: 'Addiction Psychiatry',
    date: 'Mon, 21 November',
    time: '13:00 - 14:30',
  };

  const renderTopPsychiatrist = ({
    item: { uri, experience, name, rating, specialty, patients, description },
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
