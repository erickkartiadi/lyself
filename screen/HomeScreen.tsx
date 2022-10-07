import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';

import Card from '../components/base/Card';
import ArticleSection from '../components/section/ArticleSection';
import SpotifySection from '../components/section/SpotifySection';
import TodoSection from '../components/section/TodoSection';
import { HomeScreenNavigationProps } from '../navigation/navigation.types';
import { styles } from '../theme/styles';

function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  return (
    <ScrollView contentContainerStyle={[styles.containerGutter]}>
      <View style={styles.sectionLarge}>
        <Card>
          <Text h4>Meditation Guide</Text>
        </Card>
        <Card>
          <Text h4>Breathing Guide</Text>
        </Card>
      </View>
      <TodoSection />
      <ArticleSection />
      <SpotifySection />
    </ScrollView>
  );
}

export default HomeScreen;
