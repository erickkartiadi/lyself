import axios from 'axios';

import { User } from '../../types/types';

type CreateUserDto = Omit<User, 'id'>;

export async function register(createUserDto: CreateUserDto) {
  return axios.post('http://192.168.1.110:3000/auth/register', {
    ...createUserDto,
  });
}

export async function login(loginDto: Omit<CreateUserDto, 'name'>) {
  return axios.post('http://192.168.1.110:3000/auth/login', {
    ...loginDto,
  });
}

export async function forgotPassword(email: string) {
  return axios.post('http://192.168.1.110:3000/auth/forgot-password', {
    email,
  });
}
