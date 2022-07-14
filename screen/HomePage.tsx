import { Button, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { RecommendedProps, dataRecommended } from '../constant';
import { styles } from '../theme';
import { comingSoonToast } from '../utils/comingSoonToast';
import ViewSeparator from '../components/ViewSeparator';
import RecommendedActivityCard from '../components/widget/RecommendedActivityCard';
import MentalScoreCard from '../components/widget/MentalScoreCard';
import Dropdown from '../components/Dropdown';
import ProgressCard from '../components/widget/ProgressCard';
import StatusCard from '../components/widget/StatusCard';

function HomePage() {
  const { theme } = useTheme();

  const renderRecommended = ({ item }: { item: RecommendedProps }) => (
    <RecommendedActivityCard
      onPress={comingSoonToast}
      key={item.id}
      activity={item.activity}
      title={item.title}
      time={item.time}
    />
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: theme.spacing.xl,
      }}
    >
      <View style={styles.containerSection}>
        <Text h3>Recommended activity</Text>
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
          <Text h3>Your stats</Text>
          <View>
            <Dropdown />
          </View>
        </View>
        <MentalScoreCard />
        <StatusCard />
      </View>
      <View style={styles.containerSection}>
        <Text h3>Continue your progress</Text>
        <ProgressCard />
      </View>
      <View style={(styles.containerSection, { marginTop: theme.spacing.xl })}>
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
  );
}

export default HomePage;
