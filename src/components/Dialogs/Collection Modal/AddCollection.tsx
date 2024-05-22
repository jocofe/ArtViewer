import { useContext, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, addDoc, getDocs, query, where, collectionGroup } from 'firebase/firestore';
import { db } from '../../../config/config';
import { Button } from '../../Buttons/Buttons';
import { FilterCollectionBar } from '../../Form/FilterCollectionBar';
import { Close } from '../../Icons/icons';
import { UserContext } from '../../../context/UserContextProvider';

interface Collection {
  id: string;
  name: string;
  artpieces: []; // Actualiza el tipo según la estructura de tus datos de arte
}

interface AddCollectionModalProps {
  collections: Collection[];
}

interface NewCollectionFormInputs {
  name: string;
}

export const AddCollectionModal = ({ collections }: AddCollectionModalProps) => {
  const { userData } = useContext(UserContext);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(collections);
  const [userCollections, setUserCollections] = useState<Collection[]>([]);
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);
  const { register, handleSubmit, reset } = useForm<NewCollectionFormInputs>();

  useEffect(() => {
    if (!userData) return;

    const fetchCollections = async () => {
      try {
        const q = query(collectionGroup(db, 'collections'), where('userId', '==', userData.email));
        const querySnapshot = await getDocs(q);
        const userCollectionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Collection[];
        setUserCollections(userCollectionsData);
        setFilteredCollections(userCollectionsData);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, [userData]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setFilteredCollections(userCollections);
    } else {
      const filtered = userCollections.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCollections(filtered);
    }
  };

  const handleCreateNewCollection = () => {
    setIsCreatingNewCollection(true);
  };

  const handleCloseModal = () => {
    setIsCreatingNewCollection(false);
    reset();
  };

  const onSubmit: SubmitHandler<NewCollectionFormInputs> = async data => {
    if (!userData) return;

    try {
      await addDoc(collection(db, `users/${userData.email}/collections`), {
        name: data.name,
        artpieces: [],
      });
      console.log('Collection created successfully');
      handleCloseModal();
      // Fetch updated collections
      const q = query(collectionGroup(db, 'collections'), where('userId', '==', userData.email));
      const querySnapshot = await getDocs(q);
      const updatedUserCollections = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Collection[];
      setUserCollections(updatedUserCollections);
      setFilteredCollections(updatedUserCollections);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div className="collection-modal-wrapper">
      <div className="collection-modal__title">
        <h3>{isCreatingNewCollection ? 'Create New Collection' : 'Add this Piece to a collection'}</h3>
        <Close className="icon-absolute" onClick={handleCloseModal} />
      </div>
      <div className="collection-modal__content">
        {isCreatingNewCollection ? (
          <form onSubmit={handleSubmit(onSubmit)} className="collection-modal-wrapper">
            <div className="collection-modal__content">
              <div className="collection-modal__form">
                <div className="collection-modal__name">
                  <p>Name</p> <p>64</p>
                  <input
                    className="collection-input__name"
                    type="text"
                    {...register('name', { required: true, maxLength: 64 })}
                  />
                </div>
              </div>
              <div className="collection-modal__buttons">
                <Button color="sub_primary" type="submit">
                  Create collection
                </Button>
                <Button type="button" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <FilterCollectionBar size={'normal'} placeholder={'Filter collections'} onSearch={handleSearch} />
            <div className="collection-modal__collections">
              {filteredCollections.length > 0 ? (
                filteredCollections.map(collection => (
                  <div className="collections-wrapper" key={collection.id}>
                    <div className="collection">
                      <div className="collection__image"></div>
                      <p className="collection__name">{collection.name}</p>
                      <p className="collection__artpieces">Art Pieces: {collection.artpieces.length}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>There's not any collection created. Create one collection to add the Piece.</p>
              )}
            </div>
            <div className="collection-modal__buttons">
              <Button color="sub_primary" onClick={handleCreateNewCollection}>
                Create new collection
              </Button>
              <Button type="submit">Done</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
