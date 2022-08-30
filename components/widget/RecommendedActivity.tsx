import React from 'react';
import { FlatList, View } from 'react-native';
import BaseDivider from '../bases/BaseDivider';
import { RecommendedProps, recommendedData } from '../../constant/constant';
import { comingSoonToast } from '../../utils/comingSoonToast';
import SectionTitle from '../SectionTitle';
import { styles } from '../../theme/styles';
import RecommendedActivityCard from '../cards/RecommendedActivityCard';

function RecommendedActivity() {
  const renderRecommended = ({ item }: { item: RecommendedProps }) => (
    <RecommendedActivityCard
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
        keyExtractor={(item: RecommendedProps) => item.id}
      />
    </View>
  );
}

export default RecommendedActivity;
