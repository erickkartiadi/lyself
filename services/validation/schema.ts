import { object, string } from 'yup';

export const registerSchema = object({
  name: string().required().min(2).max(255),
  email: string().required().email(),
  password: string()
    .required()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        'Password must contain at least eight characters, one number, one uppercase, one lowercase letter',
    }),
});

export const loginSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export const forgotPasswordSchema = object({
  email: string().required().email(),
});
