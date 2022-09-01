import { Avatar, Icon, Text, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Appointment } from '../../types/types';
import useToggle from '../../utils/hooks/useToggle';
import BaseBottomSheet from '../bases/BaseBottomSheet';
import BaseCard from '../bases/BaseCard';

function AppointmentCard({ name, specialty, date, time }: Appointment) {
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
          <Avatar
            size={60}
            rounded
            containerStyle={{ marginRight: theme.spacing.xl }}
            source={{
              uri: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
            }}
          />
          <View style={{ flex: 1 }}>
            <Text h3 h3Style={{ color: theme.colors.white }}>
              {name}
            </Text>
            <Text
              subtitle1
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
            flexDirection: 'row',
            marginTop: theme.spacing.xl,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primaryDark,
              borderRadius: BORDER_RADIUS.md,
              padding: theme.spacing.lg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '59%',
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
                  color: theme.colors.white,
                  textAlignVertical: 'center',
                }}
              >
                {date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '39%',
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
              <Text caption style={{ flex: 1, color: theme.colors.white }}>
                {time}
              </Text>
            </View>
          </View>
        </View>
      </BaseCard>
      <BaseBottomSheet
        headerTitle={name}
        onBackdropPress={toggleIsBottomSheetVisible}
        isVisible={isBottomSheetVisible}
      >
        <Text>{specialty}</Text>
      </BaseBottomSheet>
    </>
  );
}

export default AppointmentCard;
