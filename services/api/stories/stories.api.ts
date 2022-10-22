import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Story, User, UserStoryType } from '../../../types/types';
import {
  categoryColRef,
  storyColRef,
  upvoteColRef,
  usersColRef,
} from '../../firebase/firebase';
import { findUser } from '../user/users.api';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;
export type DeleteStoryDto = Pick<Story, 'id' | 'categoryId'>;
export type SaveStoryDto = {
  id: Story['id'];
  currentUserId: User['uid'];
  cancelSave: boolean;
};

export async function getStories(
  pageParam: Story | null,
  categoryId: string
): Promise<Story[]> {
  if (!pageParam) return [];

  let q = query(storyColRef, orderBy('createdAt', 'desc'), limit(10));

  if (categoryId !== 'all') {
    const filteredQuery = query(q, where('categoryId', '==', categoryId));
    q = filteredQuery;
  }

  if (pageParam?.id !== null) {
    const currSnapshot = await getDoc(doc(storyColRef, pageParam.id));
    const nextQuery = query(q, startAfter(currSnapshot));
    q = nextQuery;
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Story[];
}

export async function getUserStories(
  pageParam: Story | null,
  userId: User['uid'] | undefined,
  type: UserStoryType
): Promise<Story[]> {
  if (!userId) throw new Error('Unauthorized');
  if (!pageParam) return [];

  let q = query(storyColRef);

  if (type !== 'user') {
    const user = await findUser(userId);
    if (!user) throw new Error('unauthorized');

    let ids = user.likedStoryIds;
    if (type === 'saved') ids = user.savedStoryIds;

    if (ids.length <= 0) return [];

    q = query(q, where(documentId(), 'in', ids));
  }

  if (type === 'user') {
    q = query(q, where('creatorId', '==', userId));
  }

  q = query(q, limit(5));

  if (pageParam?.id !== null) {
    const currSnapshot = await getDoc(doc(storyColRef, pageParam.id));
    const nextQuery = query(q, startAfter(currSnapshot));
    q = nextQuery;
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Story[];
}

export async function createStory(createStoryDto: CreateStoryDto): Promise<void> {
  const newStoryRef = await addDoc(storyColRef, createStoryDto);
  await updateDoc(doc(categoryColRef, createStoryDto.categoryId), {
    storyIds: arrayUnion(newStoryRef.id),
    storyCount: increment(1),
  });
  await setDoc(doc(upvoteColRef, newStoryRef.id), {
    count: 0,
    userIds: [],
  });
}

export async function saveStory({
  cancelSave,
  currentUserId,
  id,
}: SaveStoryDto): Promise<void> {
  const userDocRef = doc(usersColRef, currentUserId);

  await updateDoc(userDocRef, {
    savedStoryIds: cancelSave ? arrayRemove(id) : arrayUnion(id),
  });
}

export async function deleteStory({ id, categoryId }: DeleteStoryDto) {
  const storyDocRef = doc(storyColRef, id);

  // remove from stories collection
  await deleteDoc(storyDocRef);

  // remove category storyIds and decrement storyCount
  await updateDoc(doc(categoryColRef, categoryId), {
    storyIds: arrayRemove(id),
    storyCount: increment(-1),
  });

  // removes upvote collection
  await deleteDoc(doc(upvoteColRef, id));
}
