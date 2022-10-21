import { object, string } from 'yup';

export const createStorySchema = object({
  title: string().required().min(2).max(255),
  content: string().optional(),
  categoryId: string().required('You must select this story category.'),
});

export const createCategorySchema = object({
  name: string().required().lowercase(),
  nameShort: string(),
});

export const createReplySchema = object({
  reply: string().required(),
});
