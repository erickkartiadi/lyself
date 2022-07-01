import { Text, useTheme } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import BaseSearchBar from '../../components/BaseSearchBar';
import ActivityIcon, { Activities } from '../../components/ActivityIcon';
import { PreferencesContext } from '../../theme/PreferencesContext';
import { styles } from '../../theme';
import { ArticleCardProps, dataArticles } from '../../constant';
import ViewSeparator from '../../components/ViewSeparator';
import ArticleCard from '../../components/widget/ArticleCard';

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
    url={item.url}
  />
);

function ExplorePage({ navigation }: ExplorePageProps) {
  const { theme: preferences } = useContext(PreferencesContext);
  const { theme } = useTheme();
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
        contentContainerStyle={{
          paddingBottom: theme.spacing.xl,
          paddingTop: theme.spacing.lg,
        }}
      >
        <BaseSearchBar />
        <View
          style={{
            ...styles.containerSection,
            ...styles.noContainerOffset,
            marginTop: theme.spacing.lg,
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
                  marginBottom: theme.spacing.xl * 1.25,
                }}
                onPress={() => navigation.navigate('Progress')}
              >
                <ActivityIcon activity={activity} />
                <Text
                  sm
                  grey
                  style={{
                    marginTop: theme.spacing.md,
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
        <View style={styles.containerSection}>
          <Text h4>Calming playlist </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default ExplorePage;
