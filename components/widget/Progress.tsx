import React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';
import { progressData } from '../../utils/constant/seed';
import ProgressActivityCard from '../cards/ProgressActivityCard';
import SectionTitle from '../SectionTitle';

function Progress() {
  return (
    <View style={styles.sectionLarge}>
      <SectionTitle title="Continue your progress" />
      {progressData.map(({ activity, id, progress, time, title }) => (
        <ProgressActivityCard
          activity={activity}
          key={id}
          id={id}
          progress={progress}
          time={time}
          title={title}
        />
      ))}
    </View>
  );
}
export default Progress;
