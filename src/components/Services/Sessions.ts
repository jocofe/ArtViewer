import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { UserSessions } from "../../models/userSessions";
import { parseUserAgent } from "./userAgentParser";


// Getting users IP
export const getUserIpAddress = async (): Promise<string> => { // Promise IP as string
    const response = await fetch('https://api.ipify.org?format=json') // ipify api to get IP address
    const data = await response.json();
    return data.ip;
};

// Register any new session in documents 'sessions'
export const registerLoginSession = async (userEmail: string): Promise<void> => {
    const ipAddres = await getUserIpAddress();
    const userAgent = navigator.userAgent;
    const currentTime = new Date();
    const { operatingSystem, browser } = parseUserAgent(userAgent);

    const userDocRef = doc(db, 'users', userEmail);
    const sessionsCollectionRef = collection(userDocRef, 'sessions');

    try {
        // Añadir un nuevo documento a la colección 'sessions' con un ID generado automáticamente
        await addDoc(sessionsCollectionRef, {
            ipAddres: ipAddres,
            userAgent: userAgent,
            operatingSystem, 
            browser,
            loginTime: currentTime,
            lastAccess: currentTime
        });
    } catch (error) {
        console.error('Error registering session:', error);
        throw error;
    }
};



// Update last access
export const updateLastAcced = async (userEmail: string, sessionsId: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userEmail);
    const sessionDocRef = doc(userDocRef, 'sessions', sessionsId);
    const currentTime = new Date();

    await updateDoc(sessionDocRef, {
        lastAccess: currentTime
    });
};

// Getting user's login sessions
export const getUserLoginSessions = async (userEmail: string): Promise<UserSessions[]> => { // Return array of objects type UserSessions
    const userDocRef = doc(db, 'users', userEmail);
    const sessionsCollectionRef = collection(userDocRef, 'sessions'); // Reference to sessions collection

    const sessionDocSnapshot = await getDocs(sessionsCollectionRef); // Obtain docs on sessions

    // Process sessions document info
    const sessions: UserSessions[] = []; // Create empty array to storage sessions info

    sessionDocSnapshot.forEach(doc => { // Mapiing every document on the snapshot
        const sessionData = doc.data(); // obtain document data
        sessions.push({                 // Adding UserSessions object to sessions array with the info
            id: doc.id,
            ipAddres: sessionData.ipAddres,
            userAgent: sessionData.userAgent,
            loginTime: sessionData.loginTime.toDate(),
            lastAccess: sessionData.lastAccess.toDate(),
        })
    });

    return sessions;
}

// Close sessions
export const closeSession = async (userEmail: string, sessionId: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userEmail);
    const sessionDocRef = doc(userDocRef, 'sessions', sessionId);

    try {
        // Eliminar el documento de la sesión
        await deleteDoc(sessionDocRef);
    } catch (error) {
        console.error('Error revoking session:', error);
        throw error;
    }
};