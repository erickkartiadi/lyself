import { useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView, View } from 'react-native';

import breathingIllustration from '../assets/images/breathing.png';
import meditationIllustrationDark from '../assets/images/meditation-dark.png';
import meditationIllustrationLight from '../assets/images/meditation-light.png';
import ActivityCard from '../components/cards/ActivityCard';
import { VerticalSeparator } from '../components/layout/ItemSeparator';
import ArticleSection from '../components/section/ArticleSection';
import SpotifySection from '../components/section/SpotifySection';
import { HomeScreenNavigationProps } from '../navigation/navigation.types';
import layout from '../styles/layout';
import { ThemeModeContext } from '../utils/context/ThemeModeContext';

function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[layout.container_gutter]}>
      <View style={layout.section_lg}>
        <ActivityCard
          buttonTitle="START"
          iconName="play"
          image={isDarkMode ? meditationIllustrationDark : meditationIllustrationLight}
          title="Meditation"
          text="Start your day with relaxed mind"
          colorLight={theme.colors.purpleDark}
          colorDark={theme.colors.purple}
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <VerticalSeparator />
        <ActivityCard
          buttonTitle="START"
          iconName="play"
          image={breathingIllustration}
          title="Breathing Exercise"
          text="Let go your anxiety and worries"
          colorLight={theme.colors.blueDark}
          colorDark={theme.colors.blue}
          onPress={() => navigation.navigate('InDevelopment')}
        />
      </View>
      <ArticleSection />
      <SpotifySection />
    </ScrollView>
  );
}

export default HomeScreen;
