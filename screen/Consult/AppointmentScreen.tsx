import { lightColors, Tab, TabView, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import AppointmentCard from '../../components/cards/AppointmentCard';
import {
  completedAppointmentData,
  upcomingAppointmentData,
} from '../../constant/constant';
import { FONT_FAMILY, FONT_SIZE, styles } from '../../theme/styles';
import { Appointment } from '../../types/types';

function AppointmentScreen() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { theme } = useTheme();

  const renderUpcomingAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard {...item} />
  );
  const renderCompletedAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard isAppointmentCompleted {...item} />
  );

  return (
    <>
      <Tab
        value={tabIndex}
        onChange={(e) => setTabIndex(e)}
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
        disableIndicator
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

      <TabView
        disableSwipe
        value={tabIndex}
        onChange={setTabIndex}
        animationType="spring"
      >
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={upcomingAppointmentData}
            renderItem={renderUpcomingAppointment}
            contentContainerStyle={[styles.containerGutter, styles.section]}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={completedAppointmentData}
            renderItem={renderCompletedAppointment}
            contentContainerStyle={[styles.containerGutter, styles.section]}
          />
        </TabView.Item>
      </TabView>
    </>
  );
}
export default AppointmentScreen;