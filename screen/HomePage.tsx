import { Button, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';

import { Icon } from '@rneui/base';
import { RecommendedProps, dataRecommended } from '../constant';
import { PreferencesContext } from '../theme/PreferencesContext';
import styles from '../theme/styles';
import { comingSoonToast } from '../utils/comingSoonToast';
import ViewSeparator from '../components/ViewSeparator';
import RecommendedActivityCard from '../components/RecommendedActivityCard';
import MentalScoreChart from '../components/MentalScoreChart';
import Dropdown from '../components/Dropdown';
import BaseCard from '../components/BaseCard';

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
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={preferences === 'light' ? 'dark' : 'light'} />
      <ScrollView nestedScrollEnabled>
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
          <MentalScoreChart />
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <BaseCard
                containerStyle={{
                  width: '48%',
                }}
              >
                <Text bold style={{ marginBottom: themeSpacing.sm }}>
                  Heart rate
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <Text h2 h2Style={{ color: theme.colors.primary }}>
                      100
                    </Text>
                    <Text style={{ color: theme.colors.grey1 }}>bpm</Text>
                  </View>
                  <View>
                    <Icon
                      containerStyle={{
                        marginRight: 12,
                      }}
                      type="font-awesome-5"
                      name="heartbeat"
                      size={36}
                    />
                  </View>
                </View>
              </BaseCard>
            </View>
          </View>
        </View>
        <View style={styles.containerSection}>
          <Button
            title="Change Theme"
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
