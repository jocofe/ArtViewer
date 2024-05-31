import { UserContext } from '../../context/UserContextProvider';
import { Tabs } from '../../components/Tabs/Tabs';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Likes } from '../../components/Likes/Likes';
import { useFetchSingleCollection } from '../../hooks/useFetchSingleCollection';
import { useContext } from 'react';

export const UserPage = () => {
  const { userData } = useContext(UserContext);
  const collections = useFetchSingleCollection(userData);

  return (
    <div>
      <ProfileCard />
      <Tabs collections={collections} likes={<Likes />} />
    </div>
  );
};
