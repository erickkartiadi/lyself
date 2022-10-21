// used in both Reply and Story
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';

import { Reply, Story, Upvote, User } from '../../../../types/types';
import { upvoteColRef, usersColRef } from '../../../firebase/firebase';

export type UpvoteStoryDto = {
  id: Story['id'] | Reply['id'];
  type: 'story' | 'reply';
  currentUserId: User['uid'];
  cancelUpvote: boolean;
};

export async function upvote({
  id,
  currentUserId,
  cancelUpvote,
  type,
}: UpvoteStoryDto): Promise<Story['id'] | Reply['id']> {
  const userDocRef = doc(usersColRef, currentUserId);

  await updateDoc(userDocRef, {
    [type === 'story' ? 'likedStoryIds' : 'likedReplyIds']: cancelUpvote
      ? arrayRemove(id)
      : arrayUnion(id),
  });

  await updateDoc(doc(upvoteColRef, id), {
    userIds: cancelUpvote ? arrayRemove(currentUserId) : arrayUnion(currentUserId),
    count: increment(cancelUpvote ? -1 : 1),
  });

  return id;
}

export async function findUpvote(storyId: Story['id']): Promise<Upvote> {
  const snapshot = await getDoc(doc(upvoteColRef, storyId));
  if (snapshot.exists()) return { ...snapshot.data() };
  return {
    userIds: [],
    count: 0,
  };
}
