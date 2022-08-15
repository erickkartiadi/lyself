import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable } from 'react-native';
import { ChatRouteParamList } from '../routes/types';

export type PsychiatristDataProp = {
  uri: string;
  experience: string;
  name: string;
};

function PsychiatristAvatar({ uri, experience, name }: PsychiatristDataProp) {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatRouteParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Psychiatrist')}
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Avatar
        size={100}
        rounded
        source={{
          uri,
        }}
        containerStyle={{ marginBottom: theme.spacing.sm }}
      />
      <Text h4>{name}</Text>
      <Text style={{ color: theme.colors.grey2, textAlign: 'center' }}>
        {experience}
      </Text>
    </Pressable>
  );
}

export default PsychiatristAvatar;
