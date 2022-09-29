import { lightColors, Tab, TabView, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import AppointmentCard from '../../components/consult/AppointmentCard';
import VerticalSeparator from '../../components/layout/VerticalSeparator';
import { FONT, styles } from '../../theme/styles';
import { AppointmentScreenNavigationProps } from '../../types/navigation.types';
import { Appointment } from '../../types/types';
import {
  completedAppointmentData,
  upcomingAppointmentData,
} from '../../utils/constant/seed';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function AppointmentScreen({ navigation }: AppointmentScreenNavigationProps) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { theme } = useTheme();

  const renderUpcomingAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard {...item} />
  );
  const renderCompletedAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard isAppointmentCompleted {...item} />
  );

  useApplyHeaderWorkaround(navigation.setOptions);

  return (
    <>
      {/* TODO hide tab on scroll */}
      <Tab
        value={tabIndex}
        onChange={(e) => setTabIndex(e)}
        containerStyle={[
          styles.shadowSmall,
          {
            backgroundColor: theme.colors.secondary,
          },
        ]}
        disableIndicator
      >
        <Tab.Item
          title="Upcoming"
          titleStyle={(active) => [
            FONT.small,
            {
              color: active ? lightColors.white : theme.colors.black,
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
          ]}
        />
        <Tab.Item
          title="Completed"
          titleStyle={(active) => [
            FONT.small,
            {
              color: active ? lightColors.white : theme.colors.black,
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
          ]}
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
            ItemSeparatorComponent={VerticalSeparator}
            contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={completedAppointmentData}
            renderItem={renderCompletedAppointment}
            ItemSeparatorComponent={VerticalSeparator}
            contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
          />
        </TabView.Item>
      </TabView>
    </>
  );
}
export default AppointmentScreen;
