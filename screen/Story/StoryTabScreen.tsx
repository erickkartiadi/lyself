import { FAB, Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { VerticalSeparator } from '../../components/layout/ItemSeparator';
import RefreshControl from '../../components/layout/RefreshControl';
import StoryCard from '../../components/story/StoryCard';
import { StoryTabScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetStories } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import { SIZING } from '../../theme/theme';

function StoryTabScreen({ navigation }: StoryTabScreenNavigationProps) {
  const { theme } = useTheme();

  const { data, isFetching, refetch } = useGetStories();

  return (
    <>
      <FlatList
        contentContainerStyle={[
          layout.flexGrow,
          layout.containerGutter,
          layout.sectionLarge,
        ]}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        ItemSeparatorComponent={VerticalSeparator}
        renderItem={({ item }) => <StoryCard {...item} />}
        data={data}
      />
      <FAB
        placement="right"
        color={theme.colors.primary}
        onPress={() => navigation.navigate('StoryStack', { screen: 'AddStory' })}
        icon={
          <Icon
            name="add"
            type="ionicon"
            size={SIZING['4xl']}
            color={theme.colors.white}
          />
        }
      />
    </>
  );
}

export default StoryTabScreen;
