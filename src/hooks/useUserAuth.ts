import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export const useUserAuth = () => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
            } else {
                setUser(false);
            }
        });
        return () => unsubscribe();
    })

    return { user };
}