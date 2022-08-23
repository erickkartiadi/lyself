import React from 'react';
import { Avatar, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import colorAlpha from 'color-alpha';
import { Icon } from '@rneui/base';
import BaseCard from './BaseCard';
import BaseBottomSheet from './BaseBottomSheet';
import useToggle from '../utils/hooks/useToggle';

export interface PsychiatristCardProps {
  uri: string;
  experience: string;
  name: string;
  rating: string;
  specialty: string;
}

function PsychiatristCard({
  uri,
  experience,
  specialty,
  name,
  rating,
}: PsychiatristCardProps) {
  const { theme } = useTheme();
  const [isBottomSheetVisible, toggleIsBottomSheetVisible] = useToggle(false);

  return (
    <>
      <BaseCard onPress={() => toggleIsBottomSheetVisible(true)}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            rounded
            size={80}
            source={{ uri }}
            containerStyle={{ marginRight: theme.spacing.xl }}
          />
          <View style={{ flex: 1 }}>
            <Text subtitle1>{name}</Text>
            <Text
              subtitle2
              style={{ color: colorAlpha(theme.colors.black, 0.75) }}
            >
              {specialty}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <View
                style={{
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical: theme.spacing.sm,
                  backgroundColor: theme.colors.grey5,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                  marginTop: theme.spacing.md,
                }}
              >
                <Icon
                  name="heart"
                  type="ionicon"
                  size={16}
                  color={theme.colors.primary}
                  style={{ marginRight: theme.spacing.sm }}
                />
                <Text subtitle2>{rating}</Text>
              </View>
              <View
                style={{
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical: theme.spacing.sm,
                  backgroundColor: theme.colors.grey5,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                  marginTop: theme.spacing.md,
                }}
              >
                <Icon
                  name="briefcase"
                  type="ionicon"
                  size={16}
                  color={theme.colors.blue}
                  style={{ marginRight: theme.spacing.sm }}
                />
                <Text subtitle2>{experience}</Text>
              </View>
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

export default PsychiatristCard;
