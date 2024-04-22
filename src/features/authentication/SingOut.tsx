import { getAuth, signOut } from "firebase/auth";
import { Button } from "../../components/Buttons/Buttons";

export const SignOut = () => {
    const auth = getAuth();

    return (
        <Button onClick={() => signOut(auth)} type="primary" label="Sign Out" size="medium"></Button>
    )
}