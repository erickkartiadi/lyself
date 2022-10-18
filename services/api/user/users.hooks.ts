import { useQuery } from '@tanstack/react-query';

import { User } from '../../../types/types';
import { findUser } from './users.api';

const useGetUser = (uid: User['uid']) =>
  useQuery<User | undefined>(['user', uid], () => findUser(uid));

export default useGetUser;
