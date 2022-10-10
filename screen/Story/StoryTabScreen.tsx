import { FAB, Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import StoryCard from '../../components/story/StoryCard';
import { StoryTabScreenNavigationProps } from '../../navigation/navigation.types';
import appStyles from '../../theme/appStyles';
import normalize from '../../utils/normalize';

function StoryTabScreen({ navigation }: StoryTabScreenNavigationProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        appStyles.containerGutter,
        appStyles.sectionLarge,
        appStyles.flex,
      ]}
    >
      <StoryCard />
      <FAB
        placement="right"
        color={theme.colors.primary}
        onPress={() => navigation.navigate('StoryStack', { screen: 'AddStory' })}
        icon={
          <Icon
            name="add"
            type="ionicon"
            size={normalize(30)}
            color={theme.colors.white}
          />
        }
      />
    </ScrollView>
  );
}

export default StoryTabScreen;
