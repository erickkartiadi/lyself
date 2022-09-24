import { Button, CheckBox, useTheme } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

import BaseBottomSheet from '../../components/bases/BaseBottomSheet';
import GraphScore from '../../components/widget/GraphScore';
import Progress from '../../components/widget/Progress';
import RecommendedActivity from '../../components/widget/RecommendedActivity';
import { styles } from '../../theme/styles';

function HomeScreen() {
  const { theme } = useTheme();
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

  const bottomSheetRef = useRef<Modalize>(null);

  const handleEditWidget = (no: number) => {
    setActiveWidgets((prevState) =>
      prevState.map((widget) =>
        widget.no === no ? { ...widget, active: !widget.active } : widget
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}>
      {activeWidgets.map(({ no, active, Widget }) => active && <Widget key={no} />)}
      <View style={styles.sectionLarge}>
        <Button
          fullWidth
          color="primary"
          iconPosition="left"
          icon={{
            type: 'material',
            name: 'edit',
            color: 'white',
          }}
          onPress={() => bottomSheetRef.current?.open()}
        >
          Edit Widget
        </Button>
      </View>
      <BaseBottomSheet
        bottomSheetRef={bottomSheetRef}
        modalStyle={[styles.containerGutter]}
      >
        <View style={styles.sectionLarge}>
          {activeWidgets.map(({ no, label, active }) => (
            <CheckBox
              key={no}
              title={label}
              checked={active}
              onPress={() => handleEditWidget(no)}
            />
          ))}
        </View>
        <Button
          containerStyle={{ marginBottom: theme.spacing.xl }}
          fullWidth
          title="Done"
          onPress={() => bottomSheetRef.current?.close()}
        />
      </BaseBottomSheet>
    </ScrollView>
  );
}

export default HomeScreen;
