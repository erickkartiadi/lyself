import { Text } from '@rneui/themed';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import BaseSearchBar from '../components/BaseSearchBar';
import ActivityIcon, { Activities } from '../components/ActivityIcon';
import { PreferencesContext } from '../theme/PreferencesContext';
import styles from '../theme/styles';

function ExplorePage() {
  const { theme: preferences } = useContext(PreferencesContext);

  const activityMenu: Activities[] = [
    'consult',
    'meditation',
    'breathing',
    'music',
    'forum',
    'article',
    'diagnose',
    'other',
  ];

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
        <BaseSearchBar />
        <View
          style={{
            ...styles.containerSection,
            ...styles.noContainerOffset,
            marginTop: themeSpacing.lg,
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {activityMenu.map((activity) => (
            <View
              key={activity}
              style={{
                width: '25%',
                alignItems: 'center',
                marginBottom: themeSpacing.xl * 1.25,
              }}
            >
              <ActivityIcon activity={activity} />
              <Text
                sm
                grey
                style={{
                  marginTop: themeSpacing.md,
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}
              >
                {activity}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

export default ExplorePage;
