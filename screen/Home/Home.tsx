import { BottomSheet, Button, CheckBox, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../../theme';
import useToggle from '../../utils/hooks/useToggle';
import Progress from '../../components/widget/Progress';
import MentalScore from '../../components/widget/MentalScore';
import RecommendedActivity from '../../components/widget/RecommendedActivity';
import { ArticleWidget } from '../../components/widget/Article';

function Home() {
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
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: theme.spacing.xl,
      }}
    >
      {activeWidgets.map(
        ({ no, active, Widget }) => active && <Widget key={no} />
      )}
      <View style={(styles.containerSection, { marginTop: theme.spacing.xl })}>
        <Button
          color="secondary"
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
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleIsBottomSheetVisible}
      >
        <View
          style={[
            styles.container,
            {
              borderTopStartRadius: theme.spacing.xl,
              borderTopEndRadius: theme.spacing.xl,
              backgroundColor: theme.colors.background,
              paddingVertical: theme.spacing.xl,
            },
          ]}
        >
          <Text
            h4
            h4Style={{
              marginTop: theme.spacing.md,
            }}
          >
            Widgets
          </Text>
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
          <Button
            fullWidth
            title="Done"
            onPress={() => toggleIsBottomSheetVisible()}
          />
        </View>
      </BottomSheet>
    </ScrollView>
  );
}

export default Home;
