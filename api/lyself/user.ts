import axios from 'axios';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

async function createUser(createUserDto: CreateUserDto) {
  return axios.post<{ id: string; name: string; email: string }>(
    'http://192.168.1.110:3000/auth/register',
    {
      ...createUserDto,
    }
  );
}

export default createUser;
