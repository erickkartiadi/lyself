import { useMutation } from '@tanstack/react-query';

import { createStory, updateStory } from './story.api';

export const useCreateStory = () => useMutation(createStory);
export const useUpdateStory = () => useMutation(updateStory);
