import { useQuery } from '@tanstack/react-query';

import { User } from '../../../types/types';
import { getUser } from './users.api';

const useGetUser = (uid: User['uid']) =>
  useQuery<User | undefined>(['user', uid], () => getUser(uid));

export default useGetUser;
