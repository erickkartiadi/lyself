import { object, string } from 'yup';

export const registerSchema = object({
  name: string().required().min(2).max(255),
  email: string().required().email().trim(),
  password: string()
    .required()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        'Password must contain at least eight characters, one number, one uppercase, one lowercase letter',
    })
    .trim(),
});

export const loginSchema = object({
  email: string().required().email().trim(),
  password: string().required().trim(),
});

export const forgotPasswordSchema = object({
  email: string().required().email(),
});
