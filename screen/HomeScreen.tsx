import { useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';

import breathingIllustration from '../assets/images/breathing.png';
import goalIllustrationDark from '../assets/images/goal-dark.png';
import goalIllustrationLight from '../assets/images/goal-light.png';
import meditationIllustrationDark from '../assets/images/meditation-dark.png';
import meditationIllustrationLight from '../assets/images/meditation-light.png';
import ActivityCard from '../components/cards/ActivityCard';
import VerticalSeparator from '../components/layout/VerticalSeparator';
import ArticleSection from '../components/section/ArticleSection';
import SpotifySection from '../components/section/SpotifySection';
import TodoSection from '../components/section/TodoSection';
import { HomeScreenNavigationProps } from '../navigation/navigation.types';
import appStyles from '../theme/appStyles';
import { ThemeModeContext } from '../utils/context/ThemeModeContext';

function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[appStyles.containerGutter]}>
      <View style={appStyles.sectionLarge}>
        <ActivityCard
          buttonTitle="START"
          iconName="play"
          image={isDarkMode ? meditationIllustrationDark : meditationIllustrationLight}
          title="Meditation"
          text="Start your day with relaxed mind"
          colorLight={theme.colors.yellow}
          colorDark={theme.colors.yellowDark}
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <VerticalSeparator />
        <ActivityCard
          buttonTitle="START"
          iconName="play"
          image={breathingIllustration}
          title="Breathing Exercise"
          text="Let go your anxiety and worries"
          colorLight={theme.colors.blueLight}
          colorDark={theme.colors.blue}
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <VerticalSeparator />
        <ActivityCard
          buttonTitle="OPEN"
          iconName="checkmark-circle"
          image={isDarkMode ? goalIllustrationDark : goalIllustrationLight}
          title="Todo List"
          text="Organize your task and goal"
          colorLight={theme.colors.greenLight}
          colorDark={theme.colors.green}
          onPress={() => {
            navigation.navigate('TodoStack', { screen: 'Todo' });
          }}
        />
      </View>
      <TodoSection />
      <ArticleSection />
      <SpotifySection />
    </ScrollView>
  );
}

export default HomeScreen;
