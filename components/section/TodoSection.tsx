import React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';
import SectionTitle from '../layout/SectionTitle';

function TodoSection() {
  return (
    <View style={styles.sectionLarge}>
      <SectionTitle title="My Goal" showRightComponent screen="TodoStack" />
    </View>
  );
}

export default TodoSection;
