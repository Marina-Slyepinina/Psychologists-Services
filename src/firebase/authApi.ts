import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./config";

interface FirebaseError extends Error {
    code: string;
    message: string;
}

const FIREBASE_ERROR_MAP: { [key: string]: string } = {
    'auth/email-already-in-use': 'Користувач з такими даними вже зареєстрований. Спробуйте увійти.',
    'auth/invalid-email': 'Введено некоректний формат електронної пошти.',
    'auth/invalid-credential': 'Неправильно введені пошта чи пароль',
    'auth/operation-not-allowed': 'Операція реєстрації не дозволена (зверніться до адміністратора).',
};

const getErrorMessage = (errorCode: string): string => {
    return FIREBASE_ERROR_MAP[errorCode] || 'Сталася невідома помибка. Спробуйте пізніше.';
};

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });

        return user;

    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getErrorMessage(firebaseError.code);
        
        throw new Error(errorMessage);
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const errorMessage = getErrorMessage(firebaseError.code);
        
        throw new Error(errorMessage);
    }
}

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error((error as { message: string }).message);
    }
}