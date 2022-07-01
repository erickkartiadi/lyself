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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: themeSpacing.xl,
          paddingTop: themeSpacing.lg,
        }}
      >
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
                <Text style={{ marginBottom: themeSpacing.sm }} bold>
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
                        marginRight: themeSpacing.sm,
                      }}
                      type="font-awesome-5"
                      name="heartbeat"
                      size={42}
                      color={theme.colors.primary}
                    />
                  </View>
                </View>
              </BaseCard>
              <BaseCard
                containerStyle={{
                  width: '48%',
                }}
              >
                <Text style={{ marginBottom: themeSpacing.sm }} bold>
                  Blood pressure
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
                    <Text h2 h2Style={{ color: theme.colors.primaryDark }}>
                      110/80
                    </Text>
                    <Text style={{ color: theme.colors.grey1 }}>mmHg</Text>
                  </View>
                  <View>
                    <Icon
                      containerStyle={{
                        marginRight: themeSpacing.sm,
                      }}
                      type="fontisto"
                      name="blood-drop"
                      size={42}
                      color={theme.colors.primaryDark}
                    />
                  </View>
                </View>
              </BaseCard>
              <BaseCard
                containerStyle={{
                  width: '48%',
                }}
              >
                <Text style={{ marginBottom: themeSpacing.sm }} bold>
                  Screen activity
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
                    <Text h2 h2Style={{ color: theme.colors.secondary }}>
                      3h 10m
                    </Text>
                    <Text sm style={{ color: theme.colors.grey1 }}>
                      1h more than yesterday
                    </Text>
                  </View>
                </View>
              </BaseCard>
              <BaseCard
                containerStyle={{
                  width: '48%',
                }}
              >
                <Text style={{ marginBottom: themeSpacing.sm }} bold>
                  Sleep time
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
                    <Text h2 h2Style={{ color: theme.colors.purple }}>
                      8h 2m
                    </Text>
                    <Text style={{ color: theme.colors.grey1 }}>Yesterday</Text>
                  </View>
                  <View>
                    <Icon
                      containerStyle={{
                        marginRight: themeSpacing.sm,
                      }}
                      type="ionicon"
                      name="moon"
                      size={42}
                      color={theme.colors.yellow}
                    />
                  </View>
                </View>
              </BaseCard>
            </View>
          </View>
        </View>
        <View style={(styles.containerSection, { marginTop: themeSpacing.xl })}>
          <Button
            radius={theme.spacing.md}
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
