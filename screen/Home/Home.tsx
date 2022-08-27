import { Button, CheckBox, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../theme/styles';
import useToggle from '../../utils/hooks/useToggle';
import Progress from '../../components/widget/Progress';
import MentalScore from '../../components/widget/MentalScore';
import RecommendedActivity from '../../components/widget/RecommendedActivity';
import { ArticleWidget } from '../../components/widget/Article';
import BaseBottomSheet from '../../components/BaseBottomSheet';

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
      Widget: MentalScore,
      label: 'Mental Score',
    },
    {
      no: 3,
      active: true,
      Widget: Progress,
      label: 'Activity Progress',
    },
    {
      no: 4,
      active: true,
      Widget: ArticleWidget,
      label: 'Article',
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
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      {activeWidgets.map(
        ({ no, active, Widget }) => active && <Widget key={no} />
      )}
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

      {/* TODO Fix type error */}
      <BaseBottomSheet
        modalProps={{}}
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleIsBottomSheetVisible}
        headerTitle="Widgets"
        wrapperStyle={{}}
      >
        <View style={{ marginVertical: theme.spacing.md }}>
          {activeWidgets.map(({ no, label, active }) => (
            <CheckBox
              containerStyle={{
                backgroundColor: theme.colors.cardBackground,
              }}
              key={no}
              title={label}
              checked={active}
              onPress={() => handleEditWidget(no)}
            />
          ))}
        </View>
        <Button
          fullWidth
          title="Done"
          onPress={() => toggleIsBottomSheetVisible()}
        />
      </BaseBottomSheet>
    </ScrollView>
  );
}

export default HomeScreen;
