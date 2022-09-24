import React from 'react';
import { FlatList, View } from 'react-native';

import { styles } from '../../theme/styles';
import { recommendedData } from '../../utils/constant/seed';
import { comingSoonToast } from '../../utils/toast';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import RecommendedActivityCard, {
  RecommendedActivityCardProps,
} from '../cards/RecommendedActivityCard';
import SectionTitle from '../SectionTitle';

function RecommendedActivity() {
  const renderRecommended = ({ item }: { item: RecommendedActivityCardProps }) => (
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
    <View style={styles.sectionLarge}>
      <SectionTitle title="Recommended activity" />
      <FlatList
        horizontal
        overScrollMode="never"
        ItemSeparatorComponent={BaseViewSeparator}
        style={[styles.noContainerGutter]}
        contentContainerStyle={[styles.containerGutter]}
        showsHorizontalScrollIndicator={false}
        data={recommendedData}
        renderItem={renderRecommended}
      />
    </View>
  );
}

export default RecommendedActivity;
