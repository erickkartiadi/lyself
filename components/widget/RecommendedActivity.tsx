import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, GestureResponderEvent, Pressable, View } from 'react-native';
import { RecommendedProps, dataRecommended } from '../../constant';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../BaseCard';
import ViewSeparator from '../ViewSeparator';

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
    <Pressable onPress={onPress}>
      <BaseCard>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIcon
            containerStyle={{ marginRight: theme.spacing.lg }}
            activity={activity}
          />
          <View style={{ paddingRight: theme.spacing.lg }}>
            <Text h4 h4Style={{ marginBottom: 0 }}>
              {title}
            </Text>
            <Text>{`${time}m`}</Text>
          </View>
        </View>
      </BaseCard>
    </Pressable>
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
    <View style={styles.containerSection}>
      <Text h3>Recommended activity</Text>
      <View style={styles.noContainerOffset}>
        <FlatList
          horizontal
          ItemSeparatorComponent={ViewSeparator}
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          data={dataRecommended}
          renderItem={renderRecommended}
          keyExtractor={(item: RecommendedProps) => item.id}
        />
      </View>
    </View>
  );
}

export default RecommendedActivity;