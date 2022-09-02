import { Avatar, Divider, Icon, ListItem, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import React from 'react';
import { Pressable, View } from 'react-native';

import { BORDER_RADIUS, styles } from '../../theme/styles';
import { Appointment } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseBottomSheet from '../bases/BaseBottomSheet';
import BaseCard from '../bases/BaseCard';

function AppointmentCard({ name, specialty, date, time, uri }: Appointment) {
  const { theme } = useTheme();
  const [isBottomSheetVisible, toggleIsBottomSheetVisible] = useToggle(false);

  return (
    <>
      <BaseCard
        cardStyle={{
          backgroundColor: theme.colors.primary,
          flex: 1,
        }}
        onPress={() => toggleIsBottomSheetVisible()}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* TODO add custom avatar */}
          <Avatar
            rounded
            size={52}
            containerStyle={{
              marginRight: theme.spacing.lg,
              borderWidth: theme.spacing.xs,
              borderColor: colorAlpha(theme.colors.white, 0.75),
            }}
            source={{
              uri,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              subtitle1
              style={{
                color: theme.colors.white,
              }}
            >
              {name}
            </Text>
            <Text
              subtitle2
              style={{
                color: colorAlpha(theme.colors.white, 0.75),
              }}
            >
              {specialty}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: BORDER_RADIUS.lg,
            backgroundColor: theme.colors.primaryDark,
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
              color={colorAlpha(theme.colors.white, 0.75)}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text
              caption
              style={{
                flex: 1,
                color: colorAlpha(theme.colors.white, 0.75),
                textAlignVertical: 'center',
              }}
            >
              {date}
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
              color={colorAlpha(theme.colors.white, 0.75)}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <Text
              caption
              style={{
                color: colorAlpha(theme.colors.white, 0.75),
              }}
            >
              {time}
            </Text>
          </View>
        </View>
      </BaseCard>
      <BaseBottomSheet
        containerStyle={styles.noContainerGutter}
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => toggleIsBottomSheetVisible(false)}
      >
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
              name="calendar-edit"
              color={theme.colors.grey3}
              size={24}
              containerStyle={{ marginRight: theme.spacing.xl }}
            />
            <Text>Change schedule</Text>
          </ListItem>
        </Pressable>
        <Divider style={{ marginVertical: theme.spacing.md }} />
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
            <Text>Text psychiatrist</Text>
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
            <Text>Start video call</Text>
          </ListItem>
        </Pressable>
      </BaseBottomSheet>
    </>
  );
}

export default AppointmentCard;
