import { Button, CheckBox, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BaseBottomSheet from '../../components/bases/BaseBottomSheet';
import GraphScore from '../../components/widget/GraphScore';
import Progress from '../../components/widget/Progress';
import RecommendedActivity from '../../components/widget/RecommendedActivity';
import { styles } from '../../theme/styles';
import useToggle from '../../utils/hooks/useToggle';

function HomeScreen() {
  const { theme } = useTheme();
  const [isBottomSheetVisible, toggleIsBottomSheetVisible] = useToggle(false);
  const [activeWidgets, setActiveWidgets] = useState([
    {
      no: 1,
      active: true,
      Widget: RecommendedActivity,
      label: 'Recommended Activity',
    },
    {
      no: 2,
      active: true,
      Widget: GraphScore,
      label: 'Mental Score',
    },
    {
      no: 3,
      active: true,
      Widget: Progress,
      label: 'Activity Progress',
    },
  ]);

  const handleEditWidget = (no: number) => {
    setActiveWidgets((prevState) =>
      prevState.map((widget) =>
        widget.no === no ? { ...widget, active: !widget.active } : widget
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.containerGutter, styles.section]}>
      {activeWidgets.map(({ no, active, Widget }) => active && <Widget key={no} />)}
      <View style={styles.section}>
        <Button
          fullWidth
          color="primary"
          iconPosition="left"
          icon={{
            type: 'material',
            name: 'edit',
            color: 'white',
          }}
          onPress={() => toggleIsBottomSheetVisible()}
        >
          Edit Widget
        </Button>
      </View>

      <BaseBottomSheet
        modalProps={{}}
        toggleBottomSheetVisible={toggleIsBottomSheetVisible}
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleIsBottomSheetVisible}
        headerTitle="Widgets"
      >
        <View style={{ marginVertical: theme.spacing.md }}>
          {activeWidgets.map(({ no, label, active }) => (
            <CheckBox
              key={no}
              title={label}
              checked={active}
              onPress={() => handleEditWidget(no)}
            />
          ))}
        </View>
        <Button fullWidth title="Done" onPress={() => toggleIsBottomSheetVisible()} />
      </BaseBottomSheet>
    </ScrollView>
  );
}

export default HomeScreen;
