import { Button, ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { scheduleData } from '../constant/constant';
import { styles } from '../theme/styles';
import { Schedule } from '../types/types';
import BaseBottomSheet, { BaseBottomSheetProps } from './bases/BaseBottomSheet';
import BaseViewSeparator from './bases/BaseViewSeparator';
import SectionTitle from './SectionTitle';

interface DateOptionProps extends Pick<ButtonProps, 'onPress'> {
  date: Date;
  isSelected: boolean;
}

function DateOption({ date, isSelected, onPress }: DateOptionProps) {
  const { theme } = useTheme();
  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.format('ddd');
  const dateOfMonth = dayjsDate.format('DD');

  const isToday = dayjsDate.isSame(dayjs(), 'date');

  const textColor = isToday ? theme.colors.primary : theme.colors.black;
  const selectedTextColor = isSelected ? theme.colors.white : textColor;

  return (
    <Button
      onPress={onPress}
      type={isSelected ? 'solid' : 'outline'}
      buttonStyle={{
        borderWidth: 0.5,
        flex: 1,
        flexDirection: 'column',
        borderColor:
          isToday || isSelected
            ? theme.colors.primary
            : theme.colors.greyOutline,
      }}
    >
      <Text
        h2
        h2Style={{
          color: selectedTextColor,
        }}
      >
        {dateOfMonth}
      </Text>
      <Text
        caption
        style={{
          textTransform: 'uppercase',
          color: selectedTextColor,
        }}
      >
        {dayOfWeek}
      </Text>
    </Button>
  );
}

dayjs.extend(objectSupport);
interface TimeOptionProps extends Pick<ButtonProps, 'onPress'> {
  hour: number;
  isSelected: boolean;
}
function TimeOption({ hour, isSelected, onPress }: TimeOptionProps) {
  const { theme } = useTheme();
  const formattedHour = dayjs({ hour }).format('HH:00');

  return (
    <View style={{ width: '20%' }}>
      <Button
        onPress={onPress}
        buttonStyle={{
          borderWidth: 0.5,
          borderColor: isSelected
            ? theme.colors.primary
            : theme.colors.greyOutline,
        }}
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
            color: isSelected ? theme.colors.white : theme.colors.black,
          }}
        >
          {formattedHour}
        </Text>
      </Button>
    </View>
  );
}

function RescheduleBottomSheet({ ...rest }: BaseBottomSheetProps) {
  const { theme } = useTheme();
  const [data] = React.useState(scheduleData);

  const [availableHours, setAvailableHours] = React.useState<number[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState(0);

  React.useEffect(() => {
    if (selectedDateIndex >= 0) {
      setAvailableHours(data[selectedDateIndex].availableHours);
      setSelectedTimeIndex(0);
    }
  }, [selectedDateIndex]);

  const renderDateOption = ({
    item,
    index,
  }: {
    item: Schedule;
    index: number;
  }) => {
    const handleDateOptionOnPress = () => {
      // -1 => didn't choose the date option at all
      setSelectedDateIndex(index === selectedDateIndex ? -1 : index);
    };

    return (
      <DateOption
        isSelected={selectedDateIndex === index}
        date={item.date}
        onPress={handleDateOptionOnPress}
      />
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
          renderItem={renderDateOption}
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
              {availableHours.map((availableHour, index) => (
                <TimeOption
                  isSelected={selectedTimeIndex === index}
                  key={availableHour}
                  hour={availableHour}
                  onPress={() => setSelectedTimeIndex(index)}
                />
              ))}
            </View>
          </View>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button fullWidth>Change Schedule</Button>
          </View>
        </View>
      )}
    </BaseBottomSheet>
  );
}

export default RescheduleBottomSheet;
