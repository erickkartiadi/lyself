import { Text } from '@rneui/themed';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { CreateStoryDto } from '../../services/api/story/story.api';
import { useSearchCategories } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import { height } from '../../styles/size';
import spacing from '../../styles/spacing';
import { text } from '../../styles/typhography';
import capitalizeEachWord from '../../utils/capitalizeEachWord';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Radio from '../base/Radio';
import SearchBar from '../base/SearchBar';
import { VerticalSeparator } from '../layout/ItemSeparator';

interface SelectCategoryBottomSheetProps extends BottomSheetProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  control: Control<CreateStoryDto>;
}

function SelectCategoryBottomSheet({
  bottomSheetRef,
  setSelectedCategory,
  control,
  ...props
}: SelectCategoryBottomSheetProps) {
  const [searchText, setSearchText] = React.useState<string | undefined>();
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const {
    data: categoryData,
    refetch,
    isFetching,
  } = useSearchCategories(debouncedSearchText);

  const handleSearchText = (value: string) => {
    setSearchText(value === '' ? undefined : value);
  };

  return (
    <BottomSheet
      showHeader
      onOpen={refetch}
      headerTitle="Select Category"
      headerActionTitle="Add Category"
      modalStyle={[layout.container_gutter]}
      adjustToContentHeight
      bottomSheetRef={bottomSheetRef}
      flatListProps={{
        ListHeaderComponent: (
          <SearchBar
            placeholder="Search category..."
            showLoading={isFetching}
            returnKeyType="search"
            value={searchText}
            onChangeText={handleSearchText}
          />
        ),
        data: categoryData,
        ListEmptyComponent: isFetching ? (
          <View />
        ) : (
          <View style={[height.h_10xl, layout.align_center, layout.justify_center]}>
            <Text h4 h4Style={spacing.mb_sm}>
              Category not found 😞
            </Text>
            <Text style={text.center}>
              You can add category by &quot;add category&quot; button
            </Text>
          </View>
        ),
        renderItem: ({ item }) => (
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => {
              const name = capitalizeEachWord(item.name);
              const nameShort = capitalizeEachWord(item?.nameShort);
              const hasAbbreviation = item.name !== item.nameShort;

              return (
                <Radio
                  checked={value === item.id}
                  text={hasAbbreviation ? `${name} (${nameShort})` : name}
                  onPress={() => {
                    onChange(item.id);
                    setSelectedCategory(nameShort);
                  }}
                />
              );
            }}
          />
        ),
        contentContainerStyle: [spacing.mb_2xl, spacing.mt_md],
        ItemSeparatorComponent: VerticalSeparator,
      }}
      {...props}
    />
  );
}

export default SelectCategoryBottomSheet;
