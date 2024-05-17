import { Tabs } from '../../components/User/tabs';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Likes } from '../../components/User/Likes';

const collections = <div>Collections Content</div>;

export const UserPage = () => {
  return (
    <div>
      <ProfileCard />
      <Tabs collections={collections} likes={<Likes/>} />
    </div>
  );
};
