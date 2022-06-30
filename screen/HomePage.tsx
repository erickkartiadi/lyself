import { Button, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { RecommendedProps, dataRecommended } from '../constant';
import { PreferencesContext } from '../theme/PreferencesContext';
import styles from '../theme/styles';
import { comingSoonToast } from '../utils/comingSoonToast';
import ViewSeparator from '../components/ViewSeparator';
import RecommendedActivityCard from '../components/RecommendedActivityCard';

const renderRecommended = ({ item }: { item: RecommendedProps }) => (
  <RecommendedActivityCard
    onPress={comingSoonToast}
    key={item.id}
    activity={item.activity}
    title={item.title}
    time={item.time}
  />
);

function HomePage() {
  const { theme: preferences, setPreferences } = useContext(PreferencesContext);

  return (
    <>
      <StatusBar style={preferences === 'light' ? 'dark' : 'light'} />
      <ScrollView>
        <View style={styles.containerSection}>
          <Text bold>Recommended activity</Text>
          <View style={styles.noContainerOffset}>
            <FlatList
              horizontal
              ItemSeparatorComponent={ViewSeparator}
              contentContainerStyle={styles.container}
              showsHorizontalScrollIndicator={false}
              data={dataRecommended}
              renderItem={renderRecommended}
              keyExtractor={(item: RecommendedProps) => item.id}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Button
            title="Switch mode"
            onPress={() =>
              setPreferences(preferences === 'light' ? 'dark' : 'light')
            }
          />
        </View>
      </ScrollView>
    </>
  );
}

export default HomePage;