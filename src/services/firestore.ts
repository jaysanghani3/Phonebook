import auth from '@react-native-firebase/auth';
import firestore, {
  collection,
  doc,
  updateDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localSotrageKeys} from '../utils/constacts';

export const setLocalUserId = async (userId: string) => {
  try {
    await AsyncStorage.setItem(localSotrageKeys.userId, userId);
  } catch (error) {
    console.log(error);
  }
};
export const getLocalUserId = async () => {
  try {
    return await AsyncStorage.getItem(localSotrageKeys.userId);
  } catch (error) {
    console.log(error);
  }
};
export const userDocRef = () => {
  try {
    return firestore().collection('users').doc(auth().currentUser?.uid);
  } catch (error) {
    console.log(error);
  }
};
export const contactDocRef = () => {
  try {
    return userDocRef()?.collection('contacts');
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (
  email: string,
  password: string,
  name: string,
  mno: string,
) => {
  const User = await auth().createUserWithEmailAndPassword(email, password);
  await User.user.sendEmailVerification();
  const userRef = userDocRef();
  if (userRef) {
    await userRef.set({
      id: auth().currentUser?.uid,
      email,
      name,
      mno,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setLocalUserId(JSON.stringify(auth().currentUser?.uid));
  }
};
export const createContact = async (contact: object, imageValue: string) => {
  try {
    const contactId = Math.random().toString(36).substring(7);
    let url = '';
    if (imageValue) {
      const reference = storage().ref(
        `${auth().currentUser?.email}-${auth().currentUser?.uid}/${contactId}`,
      );
      const pathToFile = imageValue;
      await reference.putFile(pathToFile);
      url = await reference.getDownloadURL();
    }

    const userRef = userDocRef();
    if (userRef) {
      await userRef
        .collection('contacts')
        .doc(contactId)
        .set({
          ...contact,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updateAt: firestore.FieldValue.serverTimestamp(),
          id: contactId,
          storageUrl: url,
          isLiked: false,
        });
    }
  } catch (e) {
    console.log(e);
  }
};
export const createContactOffline = async (
  contact: object,
  imageValue: string,
) => {
  try {
    const userId = JSON.parse((await getLocalUserId()) || 'null');
    const contactId = Math.random().toString(36).substring(7);
    const contactDocRefOffline = doc(
      collection(firestore(), 'users', userId, 'contacts'),
      contactId,
    );
    await setDoc(contactDocRefOffline, {
      ...contact,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updateAt: firestore.FieldValue.serverTimestamp(),
      id: contactId,
      storageUrl: imageValue,
      isLiked: false,
    });
  } catch (e) {
    console.log(e);
  }
};
export const updateContactOffline = async (
  id: string,
  contact: object,
  imageValue: string,
) => {
  try {
    const userId = JSON.parse((await getLocalUserId()) || 'null');
    let url = imageValue;

    const contactDocRefOffline = doc(
      collection(firestore(), 'users', userId, 'contacts'),
      id,
    );
    await updateDoc(contactDocRefOffline, {
      ...contact,
      updateAt: firestore.FieldValue.serverTimestamp(),
      storageUrl: url,
    });
  } catch (e) {
    console.log(e);
  }
};
export const deleteContactOffline = async (id: string) => {
  try {
    const userId = JSON.parse((await getLocalUserId()) || 'null');
    const contactDocRefOffline = doc(
      collection(firestore(), 'users', userId, 'contacts'),
      id,
    );
    await firestore().runTransaction(async transaction => {
      transaction.delete(contactDocRefOffline);
    });
  } catch (e) {
    console.log(e);
  }
};
export const likeContactOffline = async (id: string) => {
  try {
    const userId = JSON.parse((await getLocalUserId()) || 'null');
    const contactDocRefOffline = doc(
      collection(firestore(), 'users', userId, 'contacts'),
      id,
    );
    const contactDoc = await contactDocRefOffline.get();
    if (contactDoc.exists) {
      const currentIsLiked = contactDoc.data().isLiked || false;
      await updateDoc(contactDocRefOffline, {
        isLiked: !currentIsLiked,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const getAllContacts = async () => {
  try {
    const userRef = userDocRef();
    if (userRef) {
      const contacts = await userRef.collection('contacts').get();
      return contacts.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }
  } catch (e) {
    console.log(e);
  }
};
export const updateContact = async (
  id: string,
  contact: object,
  imageValue: string,
) => {
  try {
    let url = imageValue;
    if (imageValue) {
      const reference = storage().ref(
        `${auth().currentUser?.email}-${auth().currentUser?.uid}/${id}`,
      );
      const pathToFile = imageValue;
      await reference.putFile(pathToFile);
      url = await reference.getDownloadURL();
    }

    const userRef = userDocRef();
    if (userRef) {
      await userRef
        .collection('contacts')
        .doc(id)
        .update({
          ...contact,
          updateAt: firestore.FieldValue.serverTimestamp(),
          storageUrl: url,
        });
    }
  } catch (e) {
    console.log(e);
  }
};
export const deleteContact = async (id: string) => {
  try {
    const userRef = userDocRef();
    if (userRef) {
      await userRef.collection('contacts').doc(id).delete();
    }
  } catch (e) {
    console.log(e);
  }
};
export const likeContact = async (id: string) => {
  try {
    const userRef = userDocRef();
    if (userRef) {
      const contact = await userRef.collection('contacts').doc(id).get();
      const isLiked = contact.data()?.isLiked;
      await userRef.collection('contacts').doc(id).update({isLiked: !isLiked});
    }
  } catch (e) {
    console.log(e);
  }
};
