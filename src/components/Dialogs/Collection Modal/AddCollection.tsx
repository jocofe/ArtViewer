import { useContext, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/config';
import { Button } from '../../Buttons/Buttons';
import { FilterCollectionBar } from '../../Form/FilterCollectionBar';
import { Close } from '../../Icons/icons';
import { UserContext } from '../../../context/UserContextProvider';
import { constructImageUrl } from '../../ArtCard/ArtCard';
import { ArtCardDetails } from '../../../models/art-card';

interface Collection {
  id: string;
  name: string;
  artpieces: ArtPiece[];
}

interface ArtPiece {
  id: string; // Cambiado de artPieceId a id
  imageUrl: string; // Agregada propiedad imageUrl
}

interface AddCollectionModalProps {
  collections: Collection[];
  artPieceDetails: ArtCardDetails;
  onClose: () => void;
  onSave: () => void;
}

interface NewCollectionFormInputs {
  name: string;
  description: string;
}

export const AddCollectionModal = ({ collections, artPieceDetails, onClose, onSave }: AddCollectionModalProps) => {
  const { userData } = useContext(UserContext);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(collections);
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);
  const [userCollections, setUserCollections] = useState<Collection[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const { register, handleSubmit, reset } = useForm<NewCollectionFormInputs>();

  useEffect(() => {
    if (userData) {
      const fetchCollections = async () => {
        const collectionRef = collection(db, `users/${userData.email}/collections`);
        const collectionSnap = await getDocs(collectionRef);
        const collectionsData = collectionSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Collection[];
        setUserCollections(collectionsData);
        setFilteredCollections(collectionsData);
      };

      fetchCollections();
    }
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
    onClose();
  };

  const onSubmit: SubmitHandler<NewCollectionFormInputs> = async data => {
    if (!userData) return;

    try {
      const { id: artPieceId, imageId } = artPieceDetails;
      const imageUrl = constructImageUrl(imageId);
      await addDoc(collection(db, `users/${userData.email}/collections`), {
        name: data.name,
        description: data.description,
        artpieces: [{ id: artPieceId, imageUrl: imageUrl }], // Incluye el ID en el objeto de artpieces
      });
      console.log('Collection created successfully');
      onSave();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollections(prev => {
      const newSelectedCollections = new Set(prev);
      if (newSelectedCollections.has(collectionId)) {
        newSelectedCollections.delete(collectionId);
      } else {
        newSelectedCollections.add(collectionId);
      }
      return newSelectedCollections;
    });
  };

  const handleDone = async () => {
    if (!userData) return;

    try {
      await Promise.all(
        Array.from(selectedCollections).map(async collectionId => {
          const collectionDoc = doc(db, `users/${userData.email}/collections`, collectionId);
          const selectedCollection = filteredCollections.find(col => col.id === collectionId);
          if (selectedCollection) {
            const existingArtPiece = selectedCollection.artpieces.find(ap => ap.id === artPieceDetails.id);
            if (!existingArtPiece) {
              await updateDoc(collectionDoc, {
                artpieces: [
                  ...(selectedCollection.artpieces || []),
                  { id: artPieceDetails.id, imageUrl: constructImageUrl(artPieceDetails.imageId) },
                ],
              });
            }
          }
        }),
      );
      console.log('Art piece added to selected collections successfully');
      onSave();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding art piece to collections:', error);
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
                <div className="collection-modal__description">
                  <p>Description (optional)</p> <p>160</p>
                  <input
                    className="collection-input__description"
                    type="text"
                    {...register('description', { maxLength: 160 })}
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
                      <input
                        type="checkbox"
                        onChange={() => handleCollectionSelect(collection.id)}
                        checked={selectedCollections.has(collection.id)}
                      />
                      <p className="collection__name">{collection.name}</p>
                      <p className="collection__artpieces">{collection.artpieces.length} Pieces</p>
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
              <Button type="button" onClick={handleDone}>
                Done
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
