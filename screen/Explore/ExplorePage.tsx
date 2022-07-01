import { Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import BaseSearchBar from '../../components/BaseSearchBar';
import ActivityIcon, { Activities } from '../../components/ActivityIcon';
import { PreferencesContext } from '../../theme/PreferencesContext';
import styles from '../../theme/styles';
import { ArticleCardProps, dataArticles } from '../../constant';
import ArticleCard from '../../components/widget/ArticleCard';
import ViewSeparator from '../../components/ViewSeparator';

export type ExploreRouteParamList = {
  Explore: undefined;
  Progress: undefined;
};
export type ExplorePageProps = NativeStackScreenProps<
  ExploreRouteParamList,
  'Explore'
>;

const renderArticles = ({ item }: { item: ArticleCardProps }) => (
  <ArticleCard
    src={item.src}
    time={item.time}
    publisher={item.publisher}
    title={item.title}
  />
);

function ExplorePage({ navigation }: ExplorePageProps) {
  const { theme: preferences } = useContext(PreferencesContext);
  const activityMenu: Activities[] = [
    'consult',
    'meditation',
    'breathing',
    'music',
    'forum',
    'article',
    'todo',
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
              }}
            >
              <Pressable
                style={{
                  alignItems: 'center',
                  marginBottom: themeSpacing.xl * 1.25,
                }}
                onPress={() => navigation.navigate('Progress')}
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
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.containerSection}>
          <Text h4>Popular articles</Text>
          <View style={styles.noContainerOffset}>
            <FlatList
              horizontal
              ItemSeparatorComponent={ViewSeparator}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
              data={dataArticles}
              renderItem={renderArticles}
              keyExtractor={(item: ArticleCardProps) => item.title}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default ExplorePage;
