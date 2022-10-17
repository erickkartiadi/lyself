import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

import { CreateStoryDto } from '../../services/api/story/story.api';
import { useGetCategories } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import Radio from '../base/Radio';
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
  const { data: categoryData, refetch } = useGetCategories();

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
        data: categoryData,
        renderItem: ({ item }) => (
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Radio
                checked={value === item.id}
                text={item.name}
                onPress={() => {
                  onChange(item.id);
                  setSelectedCategory(item.nameShort);
                }}
              />
            )}
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
