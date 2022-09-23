import { User } from '../../../types/types';
import { apiClient } from '../../axios/axios';

type CreateUserDto = Omit<User, 'id'>;

export async function register(createUserDto: CreateUserDto): Promise<User> {
  const res = await apiClient.post('/auth/register', {
    ...createUserDto,
  });

  return res.data;
}

export async function login(loginDto: Omit<CreateUserDto, 'name'>) {
  return apiClient.post('/auth/login', {
    ...loginDto,
  });
}

export async function forgotPassword(email: string) {
  return apiClient.post('/auth/forgot-password', {
    email,
  });
}
