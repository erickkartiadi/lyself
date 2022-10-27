import {
  addDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { Reply, Story } from '../../../../types/types';
import { replyColRef, upvoteColRef } from '../../../firebase/firebase';

export type CreateReplyDto = Omit<Reply, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReplyDto = Pick<Reply, 'id' | 'repliedId' | 'reply'>;
export type DeleteReplyDto = Pick<Reply, 'id' | 'repliedId'>;

export async function createReply({
  repliedId,
  reply,
  userId,
}: CreateReplyDto): Promise<Reply> {
  const data = {
    createdAt: Timestamp.fromDate(new Date()),
    reply,
    repliedId,
    userId,
  };

  const replyDocRef = await addDoc(replyColRef(repliedId), data);

  await setDoc(doc(upvoteColRef, replyDocRef.id), {
    count: 0,
    userIds: [],
  });

  return { ...data, id: replyDocRef.id };
}

export async function updateReply({
  id,
  reply: newReply,
  repliedId,
}: UpdateReplyDto): Promise<void> {
  const replyDocRef = doc(replyColRef(repliedId), id);
  await updateDoc(replyDocRef, {
    reply: newReply,
  });
}

export async function deleteReply({ id, repliedId }: DeleteReplyDto) {
  const replyDocRef = doc(replyColRef(repliedId), id);
  await updateDoc(replyDocRef, {
    reply: '[deleted]',
    userId: '',
  });
}

export async function getReplies(storyId: Story['id']): Promise<Reply[]> {
  const q = query(replyColRef(storyId), orderBy('createdAt', 'asc'));
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
