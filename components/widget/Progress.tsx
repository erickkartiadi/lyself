import React from 'react';
import { View } from 'react-native';

import { progressData } from '../../constant/constant';
import { styles } from '../../theme/styles';
import ProgressActivityCard from '../cards/ProgressActivityCard';
import SectionTitle from '../SectionTitle';

function Progress() {
  return (
    <View style={styles.section}>
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
