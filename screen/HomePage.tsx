import { Button, Text, useTheme } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { RecommendedProps, dataRecommended } from '../constant';
import { PreferencesContext } from '../theme/PreferencesContext';
import { styles } from '../theme';
import { comingSoonToast } from '../utils/comingSoonToast';
import ViewSeparator from '../components/ViewSeparator';
import RecommendedActivityCard from '../components/widget/RecommendedActivityCard';
import MentalScoreCard from '../components/widget/MentalScoreCard';
import Dropdown from '../components/Dropdown';
import ProgressCard from '../components/widget/ProgressCard';
import StatusCard from '../components/widget/StatusCard';

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
  const { theme: preferences } = useContext(PreferencesContext);
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={preferences === 'light' ? 'dark' : 'light'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: theme.spacing.xl,
          paddingTop: theme.spacing.lg,
        }}
      >
        <View style={styles.containerSection}>
          <Text h4>Continue your progress</Text>
          <ProgressCard />
        </View>
        <View style={styles.containerSection}>
          <Text h4>Recommended activity</Text>
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
        <View style={styles.containerSection}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text h4>Your stats</Text>
            <View>
              <Dropdown />
            </View>
          </View>
          <MentalScoreCard />
          <StatusCard />
        </View>
        <View
          style={(styles.containerSection, { marginTop: theme.spacing.xl })}
        >
          <Button
            onPress={comingSoonToast}
            iconPosition="left"
            icon={{
              type: 'material',
              name: 'library-add',
              color: 'white',
            }}
          >
            Add Widget
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

export default HomePage;
