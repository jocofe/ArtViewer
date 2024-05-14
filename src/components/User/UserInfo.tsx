import { Link } from "react-router-dom";
import { Button } from "../Buttons/Buttons";
// import { collection, doc, getDoc } from "firebase/firestore";

export const UserInfo = /*async*/ () => {
    // Get the user document info from firestore
    // const userDocRef = doc(collection(db, 'users'), 'userId');
    // const userDocSnap = await getDoc(userDocRef);

    // Check if the document exists
    //if (userDocSnap.exists()) {
        // Get data
        //const userData = userDocSnap.data();

        // Adding user data to the componente
        return (
            <div className="user-profile">
                <div className="user-profile__img"></div>
                <div className="user-profile__data">
                    <h3>Ernesto Agudo{/* {userData.name} */}</h3>
                    <p className="user-profile__location">Madrid, Spain{/* {userData.location} */}</p>
                    <Link to={'/user-profile/settings'}>
                        <Button type="sub_primary" size="small" >
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>
        );
    //} else {
        // Case document does not exist
        // return <div>User not found</div>;
    //}
};