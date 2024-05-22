import Tabs from '../../Tabs.tsx/Tabs';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Likes } from '../../components/Likes/Likes';

const collections = <div>Collections Content</div>;

export const UserPage = () => {
  return (
    <div>
      <ProfileCard />
      <Tabs collections={collections} likes={<Likes/>} />
    </div>
  );
};
