import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  
  await setDoc(userRef, {
    email: user.email,
    role: "user"
  });
};

auth.onAuthStateChanged((user) => {
  if (user) {
    createUserDocument(user);
  }
});
