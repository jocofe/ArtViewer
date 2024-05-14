import { Tabs } from '../../components/User/tabs';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

const collections = <div>Collections Content</div>;
const likes = <div>Likes content</div>;

export const UserPage = () => {
  return (
    <div>
      <ProfileCard />
      <Tabs collections={collections} likes={likes} />
    </div>
  );
};
