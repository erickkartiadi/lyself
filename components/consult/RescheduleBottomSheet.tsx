import { Button, Text, useTheme } from '@rneui/themed';
import dayjs from 'dayjs';
import * as React from 'react';
import { FlatList, Image, View } from 'react-native';

import emptyIllustration from '../../assets/images/empty-illustration.png';
import { styles } from '../../theme/styles';
import { Appointment, Schedule } from '../../types/types';
import { MONTHS } from '../../utils/constant/constant';
import { scheduleData } from '../../utils/constant/seed';
import useToggle from '../../utils/hooks/useToggle';
import BaseBottomSheet, { BaseBottomSheetProps } from '../bases/BaseBottomSheet';
import BaseDialog from '../bases/BaseDialog';
import BasePicker from '../bases/BasePicker';
import BaseViewSeparator from '../bases/BaseViewSeparator';
import SectionTitle from '../SectionTitle';
import DateOption from './DateOption';
import TimeOption from './TimeOption';

type RescheduleBottomSheetProps = Pick<Appointment, 'name' | 'date'> &
  BaseBottomSheetProps;

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
  const [selectedMonth, setSelectedMonth] = React.useState(months[todayMonthIndex].value);

  const [isRescheduleDialogVisible, toggleIsRescheduleDialogVisible] = useToggle(false);
  const [isRescheduleDialogLoading, toggleIsRescheduleDialogLoading] = useToggle(false);

  // update available hours & reset the index to 0 if selected date changed
  React.useEffect(() => {
    if (selectedDateIndex >= 0 && data.length > 0) {
      setAvailableHours(data[selectedDateIndex].availableHours);
      setSelectedTimeIndex(0);
    }
  }, [selectedDateIndex]);

  // filter data based on selected month
  React.useEffect(() => {
    const selectedMonthIndex = months.findIndex((month) => month.value === selectedMonth);

    setData(
      scheduleData.filter((each) => dayjs(each.date).get('month') === selectedMonthIndex)
    );
  }, [selectedMonth]);

  const renderDateOption = ({ item, index }: { item: Schedule; index: number }) => {
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
      <BaseBottomSheet toggleBottomSheetVisible={toggleBottomSheetVisible} {...rest}>
        <View style={styles.section}>
          <SectionTitle
            title="Schedule"
            showRightComponent
            rightComponent={
              <BasePicker
                max={3}
                dropdownWidth={128}
                iconSize={16}
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
                <Image style={{ flex: 1, width: '100%' }} source={emptyIllustration} />
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
            {data.length > 0 && selectedDateIndex >= 0 && (
              <Text small style={{ color: theme.colors.primary }}>
                {dayjs(data[selectedDateIndex]?.date).format('MMMM DD, ')}
                {dayjs({
                  hour: data[selectedDateIndex]?.availableHours[selectedTimeIndex],
                }).format('hh:mm A')}
              </Text>
            )}
          </Text>
        }
      />
    </>
  );
}

export default RescheduleBottomSheet;
