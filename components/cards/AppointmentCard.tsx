import { Button, Dialog, Icon, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import objectSupport from 'dayjs/plugin/objectSupport';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { scheduleData } from '../../constant/constant';
import { BORDER_RADIUS, styles } from '../../theme/styles';
import { Appointment, Schedule } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseAvatar from '../bases/BaseAvatar';
import BaseBottomSheet, {
  BaseBottomSheetProps,
} from '../bases/BaseBottomSheet';
import BaseCard from '../bases/BaseCard';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import SectionTitle from '../SectionTitle';

dayjs.extend(objectSupport);
dayjs.extend(isBetween);

function RescheduleBottomSheet({ ...rest }: BaseBottomSheetProps) {
  const { theme } = useTheme();
  const [data] = React.useState(scheduleData);

  const [availableHours, setAvailableHours] = React.useState<number[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);
  const [selectedHourIndex, setSelectedHourIndex] = React.useState(0);

  React.useEffect(() => {
    if (selectedDateIndex >= 0) {
      setAvailableHours(data[selectedDateIndex].availableHours);
      setSelectedHourIndex(0);
    }
  }, [selectedDateIndex]);

  const renderScheduleDate = ({
    item,
    index,
  }: {
    item: Schedule;
    index: number;
  }) => {
    const scheduleDate = dayjs(item.date);
    const dayOfWeek = scheduleDate.format('ddd');
    const dateOfMonth = scheduleDate.format('DD');
    const month = scheduleDate.format('MMM');

    const isSelected = selectedDateIndex === index;

    return (
      <Button
        onPress={() => {
          if (index === selectedDateIndex) {
            setSelectedDateIndex(-1);
          } else {
            setSelectedDateIndex(index);
          }
        }}
        type={isSelected ? 'solid' : 'outline'}
        buttonStyle={{
          borderWidth: 0.5,
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <Text
          h2
          h2Style={{
            color: isSelected ? theme.colors.white : theme.colors.black,
          }}
        >
          {dateOfMonth}
        </Text>
        <Text
          caption
          style={{
            textTransform: 'uppercase',
            color: isSelected ? theme.colors.white : theme.colors.black,
          }}
        >
          {month}
        </Text>
      </Button>
    );
  };

  return (
    <BaseBottomSheet {...rest}>
      <View style={styles.section}>
        <SectionTitle title="Schedule" />
        <FlatList
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          data={data}
          horizontal
          ItemSeparatorComponent={BaseViewSeparator}
          renderItem={renderScheduleDate}
          style={[styles.noContainerGutter, styles.flatListHorizontal]}
          contentContainerStyle={[
            styles.containerGutter,
            styles.flatListHorizontalContainer,
            styles.sectionSmall,
          ]}
        />
      </View>
      {selectedDateIndex >= 0 && (
        <View style={styles.section}>
          <SectionTitle title="Available Hours" />
          <View
            style={[
              styles.sectionSmall,
              {
                flex: 1,
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginVertical: -1 * theme.spacing.sm,
                marginHorizontal: -1 * theme.spacing.sm,
              }}
            >
              {availableHours.map((availableHour, index) => {
                const isSelected = selectedHourIndex === index;
                const hour = dayjs({ hour: availableHour });
                const formattedHour = hour.format('HH:00');

                return (
                  <View key={availableHour} style={{ width: '20%' }}>
                    <Button
                      onPress={() => setSelectedHourIndex(index)}
                      buttonStyle={{ borderWidth: 0.5 }}
                      type={isSelected ? 'solid' : 'outline'}
                      containerStyle={{
                        alignItems: 'stretch',
                        marginVertical: theme.spacing.sm,
                        marginHorizontal: theme.spacing.sm,
                      }}
                      size="md"
                    >
                      <Text
                        subtitle2
                        style={{
                          color: isSelected
                            ? theme.colors.white
                            : theme.colors.black,
                        }}
                      >
                        {formattedHour}
                      </Text>
                    </Button>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ marginTop: theme.spacing.lg }}>
            <Button fullWidth>Change Schedule</Button>
          </View>
        </View>
      )}
    </BaseBottomSheet>
  );
}

interface AppointmentCardProps extends Appointment {
  isNearestAppointment?: boolean;
  isAppointmentCompleted?: boolean;
}

function AppointmentCard({
  name,
  specialty,
  date,
  uri,
  durationInMinutes,
  isNearestAppointment,
  isAppointmentCompleted,
}: AppointmentCardProps) {
  const [isDialogVisible, toggleIsDialogVisible] = useToggle(false);
  const [isDialogLoading, toggleIsDialogLoading] = useToggle(false);
  const [isRescheduleBottomSheetVisible, toggleIsRescheduleBottomSheetVisible] =
    useToggle(false);

  const { theme } = useTheme();

  const backgroundColor = isNearestAppointment
    ? theme.colors.primary
    : theme.colors.cardBackground;
  const textColor = isNearestAppointment
    ? theme.colors.white
    : theme.colors.black;
  const secondaryColor = isNearestAppointment
    ? theme.colors.primaryDark
    : theme.colors.grey5;
  const buttonBackgroundColor = isNearestAppointment
    ? theme.colors.cardBackground
    : theme.colors.primary;

  const startDate = dayjs(date);
  const endDate = startDate.add(durationInMinutes, 'minute');

  const formattedDate = startDate.format('ddd, DD MMMM');
  const formattedStartTime = startDate.format('HH:mm');
  const formattedEndTime = endDate.format('HH:mm');

  const isAppointmentOnGoing = dayjs().isBetween(
    startDate,
    endDate,
    'minute',
    '[]'
  );

  // can only reschedule if it is still more than 2 weeks
  const isCanReschedule = startDate.diff(dayjs(), 'week', true) > 2;

  const handleCancelAppointment = () => {
    toggleIsDialogLoading(true);
    setTimeout(() => {
      toggleIsDialogLoading(false);
      toggleIsDialogVisible(false);
    }, 1000);
  };

  return (
    <>
      <BaseCard
        cardStyle={{
          backgroundColor,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <BaseAvatar
            rounded
            source={{ uri }}
            containerStyle={{ marginRight: theme.spacing.lg }}
          />
          <View style={{ flex: 1 }}>
            <Text
              subtitle1
              style={{
                color: textColor,
              }}
            >
              {name}
            </Text>
            <Text
              subtitle2
              style={{
                color: colorAlpha(textColor, 0.75),
              }}
            >
              {specialty}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: BORDER_RADIUS.lg,
            backgroundColor: secondaryColor,
            marginTop: theme.spacing.xl,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              type="ionicon"
              name="calendar"
              size={20}
              color={colorAlpha(textColor, 0.75)}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text
              caption
              style={{
                flex: 1,
                color: colorAlpha(textColor, 0.75),
                textAlignVertical: 'center',
              }}
            >
              {formattedDate}
            </Text>
          </View>
          <View
            style={{
              flexShrink: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Icon
              type="ionicon"
              name="time"
              size={20}
              color={colorAlpha(textColor, 0.75)}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text
              caption
              style={{
                color: colorAlpha(textColor, 0.75),
              }}
            >
              {`${formattedStartTime} - ${formattedEndTime}`}
            </Text>
          </View>
          <View />
        </View>
        {!isAppointmentCompleted && (
          <>
            {isAppointmentOnGoing && (
              <View
                style={{
                  marginTop: theme.spacing.xl,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="outline"
                  fullWidth
                  uppercase={false}
                  buttonStyle={{ borderColor: buttonBackgroundColor }}
                  titleStyle={{ color: buttonBackgroundColor }}
                  containerStyle={{ flex: 1 }}
                  size="md"
                >
                  <Icon
                    type="ionicon"
                    name="chatbox-ellipses"
                    size={14}
                    containerStyle={{
                      marginRight: theme.spacing.sm,
                    }}
                    color={buttonBackgroundColor}
                  />
                  Chat
                </Button>
                <BaseViewSeparator spacing="sm" />
                <Button
                  fullWidth
                  uppercase={false}
                  containerStyle={{
                    flex: 1,
                  }}
                  titleStyle={{ color: backgroundColor }}
                  buttonStyle={{ backgroundColor: buttonBackgroundColor }}
                  type="solid"
                  size="md"
                >
                  <Icon
                    type="ionicon"
                    name="videocam"
                    size={14}
                    containerStyle={{
                      marginRight: theme.spacing.sm,
                    }}
                    color={backgroundColor}
                  />
                  Video Call
                </Button>
              </View>
            )}
            {!isAppointmentOnGoing && !isNearestAppointment && (
              <View
                style={{
                  marginTop: theme.spacing.xl,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  onPress={() => toggleIsDialogVisible(true)}
                  fullWidth
                  uppercase={false}
                  containerStyle={{ flex: 1 }}
                  type="outline"
                  buttonStyle={{
                    borderColor: theme.colors.grey3,
                  }}
                  titleStyle={{ color: theme.colors.grey2 }}
                  size="md"
                >
                  Cancel
                </Button>
                {isCanReschedule && (
                  <>
                    <BaseViewSeparator spacing="md" />
                    <Button
                      onPress={() => toggleIsRescheduleBottomSheetVisible(true)}
                      fullWidth
                      uppercase={false}
                      containerStyle={{ flex: 1 }}
                      size="md"
                    >
                      Reschedule
                    </Button>
                  </>
                )}
              </View>
            )}
          </>
        )}
      </BaseCard>
      <Dialog
        overlayStyle={{ backgroundColor: theme.colors.cardBackground }}
        isVisible={isDialogVisible}
        onBackdropPress={() => toggleIsDialogVisible(false)}
      >
        {isDialogLoading ? (
          <Dialog.Loading />
        ) : (
          <>
            <Dialog.Title
              title="Cancel appointment"
              titleProps={{
                style: {
                  color: theme.colors.black,
                },
              }}
            />
            <Text small style={{ marginBottom: theme.spacing.md }}>
              Are you sure you want to cancel your appointment with{' '}
              <Text small style={{ color: theme.colors.primary }}>
                {name}
              </Text>{' '}
              ?
            </Text>
            <Dialog.Actions>
              <Dialog.Button
                type="solid"
                title="CONFIRM"
                onPress={handleCancelAppointment}
              />
              <Dialog.Button
                title="CANCEL"
                containerStyle={{ marginRight: theme.spacing.md }}
                onPress={() => toggleIsDialogVisible(false)}
              />
            </Dialog.Actions>
          </>
        )}
      </Dialog>
      <RescheduleBottomSheet
        isVisible={isRescheduleBottomSheetVisible}
        onBackdropPress={() => toggleIsRescheduleBottomSheetVisible(false)}
      />
    </>
  );
}

AppointmentCard.defaultProps = {
  isNearestAppointment: false,
  isAppointmentCompleted: false,
};

export default AppointmentCard;
