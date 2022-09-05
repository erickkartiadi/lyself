import { Button, ButtonProps, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import * as React from 'react';
import { FlatList, Image, View } from 'react-native';

import emptyIllustration from '../assets/images/empty-illustration.png';
import { MONTHS } from '../constant/constant';
import { scheduleData } from '../constant/seed';
import { FONT_SIZE, styles } from '../theme/styles';
import { Appointment, Schedule } from '../types/types';
import useToggle from '../utils/hooks/useToggle';
import BaseBottomSheet, { BaseBottomSheetProps } from './bases/BaseBottomSheet';
import BaseDialog from './bases/BaseDialog';
import BasePicker from './bases/BasePicker';
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

  // TODO disable already registered date
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

interface RescheduleBottomSheetProps
  extends Pick<Appointment, 'name' | 'date'>,
    BaseBottomSheetProps {}

function RescheduleBottomSheet({
  toggleBottomSheetVisible,
  name,
  date,
  ...rest
}: RescheduleBottomSheetProps) {
  const { theme } = useTheme();
  const [data, setData] = React.useState(scheduleData);
  const todayMonthIndex = dayjs().get('month');

  const [availableHours, setAvailableHours] = React.useState<number[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState(0);

  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [months, setMonths] = React.useState(
    MONTHS.map((month) => ({ label: month, value: month }))
  );
  const [selectedMonth, setSelectedMonth] = React.useState(
    months[todayMonthIndex].value
  );

  const [isRescheduleDialogVisible, toggleIsRescheduleDialogVisible] =
    useToggle(false);
  const [isRescheduleDialogLoading, toggleIsRescheduleDialogLoading] =
    useToggle(false);

  // update available hours & reset the index to 0 if selected date changed
  React.useEffect(() => {
    if (selectedDateIndex >= 0) {
      setAvailableHours(data[selectedDateIndex].availableHours);
      setSelectedTimeIndex(0);
    }
  }, [selectedDateIndex]);

  // filter data based on selected month
  React.useEffect(() => {
    const selectedMonthIndex = months.findIndex(
      (month) => month.value === selectedMonth
    );

    setData(
      scheduleData.filter(
        (each) => dayjs(each.date).get('month') === selectedMonthIndex
      )
    );
  }, [selectedMonth]);

  const renderDateOption = ({
    item,
    index,
  }: {
    item: Schedule;
    index: number;
  }) => {
    const handleDateOptionOnPress = () => {
      setSelectedDateIndex(index);
    };

    return (
      <DateOption
        isSelected={selectedDateIndex === index}
        date={item.date}
        onPress={handleDateOptionOnPress}
      />
    );
  };

  const handleRescheduleAppointment = () => {
    toggleIsRescheduleDialogLoading(true);
    setTimeout(() => {
      toggleIsRescheduleDialogLoading(false);
      toggleIsRescheduleDialogVisible(false);
    }, 1000);
  };

  return (
    <>
      <BaseBottomSheet
        toggleBottomSheetVisible={toggleBottomSheetVisible}
        {...rest}
      >
        <View style={styles.section}>
          <SectionTitle
            title="Schedule"
            showRightComponent
            rightComponent={
              <BasePicker
                max={3}
                dropdownWidth={128}
                iconSize={FONT_SIZE.body2}
                upIconName="filter"
                downIconName="filter"
                iconType="ionicon"
                open={isPickerOpen}
                value={selectedMonth}
                items={months}
                setOpen={setIsPickerOpen}
                setValue={setSelectedMonth}
                setItems={setMonths}
              />
            }
          />
          {data.length > 0 ? (
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
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: theme.spacing.xl,
              }}
            >
              <View
                style={{
                  aspectRatio: 1,
                  height: 180,
                  marginBottom: theme.spacing.md,
                }}
              >
                <Image
                  style={{ flex: 1, width: '100%' }}
                  source={emptyIllustration}
                />
              </View>
              <Text caption style={{ color: theme.colors.grey3 }}>
                There&apos;s no schedule on {selectedMonth}
              </Text>
            </View>
          )}
        </View>
        {selectedDateIndex >= 0 && data.length > 0 && (
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
              <Button
                fullWidth
                onPress={() => {
                  toggleBottomSheetVisible(false);
                  toggleIsRescheduleDialogVisible(true);
                }}
              >
                Change Schedule
              </Button>
            </View>
          </View>
        )}
      </BaseBottomSheet>
      <BaseDialog
        title="Reschedule Appointment"
        isDialogLoading={isRescheduleDialogLoading}
        isDialogVisible={isRescheduleDialogVisible}
        onConfirm={handleRescheduleAppointment}
        toggleIsDialogVisible={toggleIsRescheduleDialogVisible}
        text={
          <Text small>
            Are you sure want to reschedule your appointment with{' '}
            <Text small>{name}</Text> to{' '}
            <Text small style={{ color: theme.colors.primary }}>
              {dayjs(data[selectedDateIndex].date).format('MMMM DD, ')}
              {dayjs({
                hour: data[selectedDateIndex].availableHours[selectedTimeIndex],
              }).format('hh:mm A')}
            </Text>
          </Text>
        }
      />
    </>
  );
}

export default RescheduleBottomSheet;
