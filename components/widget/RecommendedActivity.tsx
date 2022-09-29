import React from 'react';
import { FlatList, View } from 'react-native';

import { styles } from '../../theme/styles';
import { recommendedData } from '../../utils/constant/seed';
import { comingSoonToast } from '../../utils/toast';
import RecommendedActivityCard, {
  RecommendedActivityCardProps,
} from '../cards/RecommendedActivityCard';
import HorizontalSeparator from '../layout/HorizontalSeparator';
import SectionTitle from '../layout/SectionTitle';

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
        ItemSeparatorComponent={HorizontalSeparator}
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
