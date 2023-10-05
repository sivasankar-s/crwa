import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = [];

    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
