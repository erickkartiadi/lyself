import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, GestureResponderEvent, View } from 'react-native';
import { RecommendedProps, dataRecommended } from '../../constant';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../BaseCard';
import SectionTitle from '../SectionTitle';
import ViewSeparator from '../ViewSeparator';
import { styles } from '../../theme/styles';

interface RecommendedActivityProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  activity: Activities;
  title: string;
  time: number;
}

function RecommendedActivityCard({
  onPress,
  activity,
  title,
  time,
}: RecommendedActivityProps) {
  const { theme } = useTheme();

  return (
    <BaseCard containerStyle={{ flex: 1 }} onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          size={58}
          containerStyle={{ marginRight: theme.spacing.lg }}
          activity={activity}
        />
        <View style={{ paddingRight: theme.spacing.xl }}>
          <Text>{title}</Text>
          <Text subtitle1>{`${time}m`}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

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
        ItemSeparatorComponent={ViewSeparator}
        style={[styles.noContainerGutter, styles.flatListHorizontal]}
        contentContainerStyle={[
          styles.scrollViewContainer,
          styles.flatListHorizontalContainer,
        ]}
        showsHorizontalScrollIndicator={false}
        data={dataRecommended}
        renderItem={renderRecommended}
        keyExtractor={(item: RecommendedProps) => item.id}
      />
    </View>
  );
}

export default RecommendedActivity;
