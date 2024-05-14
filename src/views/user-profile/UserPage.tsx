import { Tabs } from "../../components/User/tabs";
import { UserInfo } from "../../components/User/UserInfo";

const collections = <div>Collections Content</div>
const likes = <div>Likes content</div>

export const UserPage = () => {
  return (
    <div>
      <UserInfo />
      <Tabs collections={collections} likes={likes}/>
    </div>
  );
};