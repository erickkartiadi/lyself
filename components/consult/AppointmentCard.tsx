import { Button, Icon, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

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

  const [isCancelDialogVisible, setIsCancelDialogVisible] = useToggle(false);
  const [isCancelDialogLoading, setIsCancelDialogLoading] = useToggle(false);

  const backgroundColor = isNearestAppointment
    ? theme.colors.primary
    : theme.colors.cardBackground;
  const textColor = isNearestAppointment ? theme.colors.white : theme.colors.black;
  const secondaryBackgroundColor = isNearestAppointment
    ? theme.colors.primaryDark
    : theme.colors.grey5;
  const buttonBackgroundColor = isNearestAppointment
    ? theme.colors.secondary
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
    setIsCancelDialogLoading(true);
    setTimeout(() => {
      setIsCancelDialogLoading(false);
      setIsCancelDialogVisible(false);
    }, 1000);
  };

  const bottomSheetRef = useRef<Modalize>(null);

  const hideCancelDialog = () => setIsCancelDialogVisible(true);

  const hideBottomSheet = () => {
    bottomSheetRef.current?.open();
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
            <Text subtitle color={textColor}>
              {name}
            </Text>
            <Text
              small
              color={isNearestAppointment ? theme.colors.grey5 : theme.colors.grey3}
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
              color={textColor}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text
              caption
              color={textColor}
              style={{
                flex: 1,
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
              color={textColor}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text caption color={textColor}>
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
                  onPress={hideCancelDialog}
                  fullWidth
                  uppercase={false}
                  containerStyle={{ flex: 1 }}
                  type="outline"
                  size="md"
                >
                  Cancel
                </Button>
                {isCanReschedule && (
                  <>
                    <BaseViewSeparator spacing="md" />
                    <Button
                      onPress={hideBottomSheet}
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
        toggleIsDialogVisible={setIsCancelDialogVisible}
        text={
          <Text small>
            Are you sure you want to cancel your appointment with{' '}
            <Text small color={theme.colors.primary}>
              {name}
            </Text>{' '}
            ?
          </Text>
        }
      />

      <RescheduleBottomSheet bottomSheetRef={bottomSheetRef} name={name} />
    </>
  );
}

AppointmentCard.defaultProps = {
  isNearestAppointment: false,
  isAppointmentCompleted: false,
};

export default AppointmentCard;
