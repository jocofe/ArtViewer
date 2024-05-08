import { getAuth, signOut } from "firebase/auth";
import { Button } from "../../components/Buttons/Buttons";
import React from "react";

export const SignOut = () => {
    const auth = getAuth();

    return (
        <Button onClick={() => signOut(auth)} type="primary" size="medium">
            Sing Out
        </Button>
    )
}