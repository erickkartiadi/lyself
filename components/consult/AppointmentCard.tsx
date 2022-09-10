import { Button, Icon, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Appointment } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseAvatar from '../bases/BaseAvatar';
import BaseCard from '../bases/BaseCard';
import BaseDialog from '../bases/BaseDialog';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import RescheduleBottomSheet from './RescheduleBottomSheet';

dayjs.extend(isBetween);

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
  const { theme } = useTheme();

  const [isCancelDialogVisible, toggleIsCancelDialogVisible] = useToggle(false);
  const [isCancelDialogLoading, toggleIsCancelDialogLoading] = useToggle(false);

  const [isRescheduleBottomSheetVisible, toggleIsRescheduleBottomSheetVisible] =
    useToggle(false);

  const backgroundColor = isNearestAppointment
    ? theme.colors.primary
    : theme.colors.cardBackground;
  const textColor = isNearestAppointment ? theme.colors.white : theme.colors.black;
  const secondaryBackgroundColor = isNearestAppointment
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

  const isAppointmentOnGoing = dayjs().isBetween(startDate, endDate, 'minute', '[]');

  // can only reschedule if it is still more than 2 weeks
  const isCanReschedule = startDate.diff(dayjs(), 'week', true) > 2;

  const handleCancelAppointment = () => {
    toggleIsCancelDialogLoading(true);
    setTimeout(() => {
      toggleIsCancelDialogLoading(false);
      toggleIsCancelDialogVisible(false);
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
              subtitle
              style={{
                color: textColor,
              }}
            >
              {name}
            </Text>
            <Text
              small
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
            backgroundColor: secondaryBackgroundColor,
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
                  onPress={() => toggleIsCancelDialogVisible(true)}
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
      <BaseDialog
        title="Cancel Appointment"
        isDialogLoading={isCancelDialogLoading}
        isDialogVisible={isCancelDialogVisible}
        onConfirm={handleCancelAppointment}
        toggleIsDialogVisible={toggleIsCancelDialogVisible}
        text={
          <Text small>
            Are you sure you want to cancel your appointment with{' '}
            <Text small style={{ color: theme.colors.primary }}>
              {name}
            </Text>{' '}
            ?
          </Text>
        }
      />

      <RescheduleBottomSheet
        name={name}
        date={date}
        isVisible={isRescheduleBottomSheetVisible}
        onBackdropPress={() => toggleIsRescheduleBottomSheetVisible(false)}
        toggleBottomSheetVisible={toggleIsRescheduleBottomSheetVisible}
      />
    </>
  );
}

AppointmentCard.defaultProps = {
  isNearestAppointment: false,
  isAppointmentCompleted: false,
};

export default AppointmentCard;
