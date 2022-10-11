import { FAB, Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import RefreshControl from '../../components/layout/RefreshControl';
import VerticalSeparator from '../../components/layout/VerticalSeparator';
import StoryCard from '../../components/story/StoryCard';
import { StoryTabScreenNavigationProps } from '../../navigation/navigation.types';
import { useGetStories } from '../../services/api/story/story.hooks';
import appStyles from '../../theme/appStyles';
import normalize from '../../utils/normalize';

function StoryTabScreen({ navigation }: StoryTabScreenNavigationProps) {
  const { theme } = useTheme();

  const { data, isFetching, refetch } = useGetStories();

  return (
    <>
      <FlatList
        contentContainerStyle={[
          appStyles.flexGrow,
          appStyles.containerGutter,
          appStyles.sectionLarge,
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
            size={normalize(30)}
            color={theme.colors.white}
          />
        }
      />
    </>
  );
}

export default StoryTabScreen;
