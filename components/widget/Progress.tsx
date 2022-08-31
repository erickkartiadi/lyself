import React from 'react';
import { View } from 'react-native';

import { progressData } from '../../constant/constant';
import { styles } from '../../theme/styles';
import ProgressCard from '../cards/ProgressCard';
import SectionTitle from '../SectionTitle';

function Progress() {
  return (
    <View style={styles.section}>
      <SectionTitle title="Continue your progress" />
      {progressData.map(({ activityType, id, progress, time, title }) => (
        <ProgressCard
          activityType={activityType}
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
