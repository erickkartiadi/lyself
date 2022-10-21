import {
  addDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import { Reply, Story } from '../../../../types/types';
import { replyColRef, upvoteColRef } from '../../../firebase/firebase';

export type CreateReplyDto = Omit<Reply, 'id' | 'createdAt'>;

export async function createReply({
  storyId,
  reply,
  userId,
}: CreateReplyDto): Promise<Reply> {
  const data = {
    createdAt: Timestamp.fromDate(new Date()),
    reply,
    storyId,
    userId,
  };

  const replyDocRef = await addDoc(replyColRef(storyId), data);

  await setDoc(doc(upvoteColRef, replyDocRef.id), {
    count: 0,
    userIds: [],
  });

  return { ...data, id: replyDocRef.id };
}

export async function getReplies(storyId: Story['id']): Promise<Reply[]> {
  const q = query(replyColRef(storyId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
    storyId,
  }));
}

export async function findReplyCount(storyId: Story['id']): Promise<number> {
  const snapshot = await getCountFromServer(query(replyColRef(storyId)));

  return snapshot.data().count;
}
