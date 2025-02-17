import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
    </div>
  );
}
