import React from 'react';
import { FlatList, View } from 'react-native';

import { recommendedData } from '../../constant/constant';
import { styles } from '../../theme/styles';
import { comingSoonToast } from '../../utils/comingSoonToast';
import BaseDivider from '../bases/BaseDivider';
import RecommendedActivityCard, {
  RecommendedActivityCardProps,
} from '../cards/RecommendedActivityCard';
import SectionTitle from '../SectionTitle';

function RecommendedActivity() {
  const renderRecommended = ({
    item,
  }: {
    item: RecommendedActivityCardProps;
  }) => (
    <RecommendedActivityCard
      id={item.id}
      onPress={comingSoonToast}
      key={item.id}
      activity={item.activity}
      title={item.title}
      time={item.time}
    />
  );

  return (
    <View style={styles.section}>
      <SectionTitle title="Recommended activity" />
      <FlatList
        horizontal
        overScrollMode="never"
        ItemSeparatorComponent={BaseDivider}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.containerGutter,
          styles.flatListHorizontalContainer,
        ]}
        showsHorizontalScrollIndicator={false}
        data={recommendedData}
        renderItem={renderRecommended}
      />
    </View>
  );
}

export default RecommendedActivity;
