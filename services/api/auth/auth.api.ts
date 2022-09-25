import { User } from '../../../types/types';
import { apiClient } from '../../axios/axios';

type CreateUserDto = Omit<User, 'id'>;

export async function register(createUserDto: CreateUserDto): Promise<User> {
  const res = await apiClient.post('/auth/register', createUserDto);

  return res.data;
}

export async function login(
  loginDto: Omit<CreateUserDto, 'name'>
): Promise<{ access_token: string }> {
  const res = await apiClient.post('/auth/login', loginDto);

  return res.data;
}

export async function forgotPassword(
  forgotPasswordDto: Pick<CreateUserDto, 'email'>
): Promise<{ envelope: { from: string; to: string[] } }> {
  const res = await apiClient.post('/auth/forgot-password', forgotPasswordDto);

  return res.data;
}
