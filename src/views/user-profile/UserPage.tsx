import { Tabs } from '../../components/Tabs/Tabs';
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
