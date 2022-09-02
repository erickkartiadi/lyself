import { lightColors, Tab, TabView, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';

import { FONT_FAMILY, FONT_SIZE, styles } from '../../theme/styles';

function AppointmentScreen() {
  const [index, setIndex] = React.useState(0);
  const { theme } = useTheme();

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: theme.colors.cardBackground,
          shadowColor: colorAlpha(lightColors.black, 0.25),
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 4,
        }}
        indicatorStyle={{
          height: 0,
        }}
      >
        <Tab.Item
          title="Upcoming"
          titleStyle={(active) => ({
            color: active ? theme.colors.white : theme.colors.black,
            paddingVertical: 0,
            paddingHorizontal: 0,
            fontFamily: FONT_FAMILY.medium,
            fontSize: FONT_SIZE.caption,
          })}
        />
        <Tab.Item
          title="Completed"
          titleStyle={(active) => ({
            color: active ? theme.colors.white : theme.colors.black,
            paddingVertical: 0,
            paddingHorizontal: 0,
            fontFamily: FONT_FAMILY.medium,
            fontSize: FONT_SIZE.caption,
          })}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={[styles.container, styles.section]}>
          <Text h1>Upcoming</Text>
        </TabView.Item>
        <TabView.Item style={[styles.container, styles.section]}>
          <Text h1>Completed</Text>
        </TabView.Item>
      </TabView>
    </>
  );
}
export default AppointmentScreen;
