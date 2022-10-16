import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@rneui/themed';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { CreateCategoryDto } from '../../services/api/story/story.api';
import { useCreateCategory } from '../../services/api/story/story.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { createCategorySchema } from '../../utils/constant/validation/story.schema';
import useToggle from '../../utils/hooks/useToggle';
import BottomSheet, { BottomSheetProps } from '../base/BottomSheet';
import ButtonLink from '../base/Link';
import TextInput from '../base/TextInput';

type AddCategoryBottomSheetProps = BottomSheetProps;

// TODO only confirmed user can add category
function AddCategoryBottomSheet({ bottomSheetRef }: AddCategoryBottomSheetProps) {
  const [isAbbreviationVisible, toggleAbbreviationVisible] = useToggle(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryDto>({
    defaultValues: {
      name: '',
      nameShort: '',
    },
    resolver: yupResolver(createCategorySchema),
  });

  const createCategoryMutation = useCreateCategory();
  const handleAddCategory = ({ name, nameShort }: CreateCategoryDto) => {
    createCategoryMutation.mutate(
      {
        name,
        nameShort: nameShort === '' ? name : nameShort,
        storyIds: [],
      },
      {
        // TODO move function to hook
        onSuccess: () => {
          bottomSheetRef.current?.close();
          reset();
        },
      }
    );
  };

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      modalStyle={[layout.container_gutter]}
      adjustToContentHeight
      showHeader
      headerTitle="Create Category"
      headerActionOnPress={() => {
        bottomSheetRef.current?.close();
      }}
      headerActionType="icon"
      FooterComponent={
        <View style={[layout.section_lg]}>
          <Button
            loading={createCategoryMutation.isLoading}
            onPress={handleSubmit(handleAddCategory)}
          >
            Add Category
          </Button>
        </View>
      }
    >
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              renderErrorMessage={errors.name !== undefined}
              errorMessage={errors.name && errors.name.message}
              label="Name"
              placeholder="e.g. Obsessive compulsive disorder"
            />
          )}
        />

        {isAbbreviationVisible && (
          <Controller
            control={control}
            name="nameShort"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                renderErrorMessage={errors.nameShort !== undefined}
                errorMessage={errors.nameShort && errors.nameShort.message}
                label="Abbreviation"
                placeholder="e.g. OCD"
              />
            )}
          />
        )}
        {!isAbbreviationVisible && (
          <ButtonLink
            style={[spacing.mt_n_md, spacing.mb_sm]}
            onPress={() => toggleAbbreviationVisible(true)}
            color="primary"
            icon={{
              type: 'ionicon',
              name: 'chevron-down-outline',
            }}
          >
            Add Abbreviation
          </ButtonLink>
        )}
      </View>
    </BottomSheet>
  );
}

export default AddCategoryBottomSheet;
