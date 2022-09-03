import { Button, Icon, ListItem, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React from 'react';
import { Pressable, View } from 'react-native';

import { BORDER_RADIUS, styles } from '../../theme/styles';
import { Appointment } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseAvatar from '../bases/BaseAvatar';
import BaseBottomSheet from '../bases/BaseBottomSheet';
import BaseCard from '../bases/BaseCard';
import BaseViewSeparator from '../bases/BaseViewSeparator';

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
  const [isBottomSheetVisible, toggleIsBottomSheetVisible] = useToggle(false);

  const backgroundColor = isNearestAppointment
    ? theme.colors.primary
    : theme.colors.cardBackground;
  const textColor = isNearestAppointment
    ? theme.colors.white
    : theme.colors.black;

  const secondaryColor = isNearestAppointment
    ? theme.colors.primaryDark
    : theme.colors.grey5;

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

  const handleOnPress = () => {
    if (isNearestAppointment) {
      toggleIsBottomSheetVisible();
    }
  };

  return (
    <>
      <BaseCard
        enablePressAnimation={isNearestAppointment}
        cardStyle={{
          backgroundColor,
        }}
        onPress={handleOnPress}
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
        {!isAppointmentCompleted && !isNearestAppointment && (
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
                  fullWidth
                  uppercase={false}
                  buttonStyle={{
                    borderColor: theme.colors.grey3,
                  }}
                  titleStyle={{ color: theme.colors.grey2 }}
                  containerStyle={{ flex: 1 }}
                  type="outline"
                  size="md"
                >
                  <Icon
                    type="ionicon"
                    name="chatbox-ellipses"
                    size={14}
                    containerStyle={{
                      marginRight: theme.spacing.sm,
                    }}
                    color={theme.colors.grey2}
                  />
                  Chat
                </Button>
                <BaseViewSeparator spacing="sm" />
                <Button
                  fullWidth
                  uppercase={false}
                  containerStyle={{ flex: 1 }}
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
                    color="white"
                  />
                  Video Call
                </Button>
              </View>
            )}
            {!isNearestAppointment && !isAppointmentOnGoing && (
              <View
                style={{
                  marginTop: theme.spacing.xl,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
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
      <BaseBottomSheet
        containerStyle={styles.noContainerGutter}
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => toggleIsBottomSheetVisible(false)}
      >
        {isCanReschedule && (
          <Pressable
            android_ripple={{
              color: colorAlpha(theme.colors.grey4, 0.25),
              foreground: true,
            }}
          >
            <ListItem
              containerStyle={[
                {
                  backgroundColor: theme.colors.cardBackground,
                  paddingVertical: theme.spacing.xl,
                  margin: 0,
                },
              ]}
            >
              <Icon
                type="material-community"
                name="calendar-clock-outline"
                color={theme.colors.grey3}
                size={24}
                containerStyle={{ marginRight: theme.spacing.xl }}
              />
              <Text>Reschedule</Text>
            </ListItem>
          </Pressable>
        )}
        {!isAppointmentOnGoing ? (
          <Pressable
            android_ripple={{
              color: colorAlpha(theme.colors.grey4, 0.25),
              foreground: true,
            }}
          >
            <ListItem
              containerStyle={[
                {
                  backgroundColor: theme.colors.cardBackground,
                  paddingVertical: theme.spacing.xl,
                  margin: 0,
                },
              ]}
            >
              <Icon
                type="material-community"
                name="calendar-remove-outline"
                color={theme.colors.error}
                size={24}
                containerStyle={{ marginRight: theme.spacing.xl }}
              />
              <Text>Cancel appointment</Text>
            </ListItem>
          </Pressable>
        ) : (
          <>
            <Pressable
              android_ripple={{
                color: colorAlpha(theme.colors.grey4, 0.25),
                foreground: true,
              }}
            >
              <ListItem
                containerStyle={[
                  {
                    backgroundColor: theme.colors.cardBackground,
                    paddingVertical: theme.spacing.xl,
                    margin: 0,
                  },
                ]}
              >
                <Icon
                  type="ionicon"
                  name="chatbox-outline"
                  color={theme.colors.blue}
                  size={24}
                  containerStyle={{ marginRight: theme.spacing.xl }}
                />
                <Text>Join chat</Text>
              </ListItem>
            </Pressable>
            <Pressable
              android_ripple={{
                color: colorAlpha(theme.colors.grey4, 0.25),
                foreground: true,
              }}
            >
              <ListItem
                containerStyle={[
                  {
                    backgroundColor: theme.colors.cardBackground,
                    paddingVertical: theme.spacing.xl,
                    margin: 0,
                  },
                ]}
              >
                <Icon
                  type="ionicon"
                  name="md-videocam-outline"
                  color={theme.colors.primary}
                  size={24}
                  containerStyle={{ marginRight: theme.spacing.xl }}
                />
                <Text>Join video call</Text>
              </ListItem>
            </Pressable>
          </>
        )}
      </BaseBottomSheet>
    </>
  );
}

AppointmentCard.defaultProps = {
  isNearestAppointment: false,
  isAppointmentCompleted: false,
};

export default AppointmentCard;
