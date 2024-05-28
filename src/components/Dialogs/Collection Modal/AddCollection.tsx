import { useContext, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/config';
import { Button } from '../../Buttons/Buttons';
import { FilterCollectionBar } from '../../Form/FilterCollectionBar';
import { Close } from '../../Icons/icons';
import { UserContext } from '../../../context/UserContextProvider';
import { AddCollectionModalProps, CollectionUser, NewCollectionFormInputs } from '../../../models/collection';

export const AddCollectionModal = ({ collections, artPieceDetails, onClose, onSave }: AddCollectionModalProps) => {
  const { userData } = useContext(UserContext);
  const [filteredCollections, setFilteredCollections] = useState<CollectionUser[]>(collections);
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);
  const [userCollections, setUserCollections] = useState<CollectionUser[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const { register, handleSubmit, reset } = useForm<NewCollectionFormInputs>();

  useEffect(() => {
    if (userData) {
      const fetchCollections = async () => {
        const collectionRef = collection(db, `users/${userData.email}/collections`);
        const collectionSnap = await getDocs(collectionRef);
        const collectionsData = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as CollectionUser);
        setUserCollections(collectionsData);
        setFilteredCollections(collectionsData);
        const collectionsWithArtPiece = collectionsData.filter(collection =>
          collection.artpieces.some(piece => piece.id === artPieceDetails.id),
        );
        const selectedCollectionIds = new Set(collectionsWithArtPiece.map(collection => collection.id));
        setSelectedCollections(selectedCollectionIds);
      };

      fetchCollections();
    }
  }, [userData, artPieceDetails.id]);

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
      const newCollection = {
        name: data.name,
        description: data.description,
        artpieces: [],
      };

      await addDoc(collection(db, `users/${userData.email}/collections`), newCollection);
      setIsCreatingNewCollection(false);
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
    if (!userData || !artPieceDetails) return;

    try {
      await Promise.all(
        userCollections.map(async collection => {
          const collectionDoc = doc(db, `users/${userData.email}/collections`, collection.id);

          const artPieceIndex = collection.artpieces.findIndex(piece => piece.id === artPieceDetails.id);
          const imageUrl = `https://framemark.vam.ac.uk/collections/${artPieceDetails.imageId}/full/!500,500/0/default.jpg`;

          if (selectedCollections.has(collection.id)) {
            if (artPieceIndex === -1) {
              const updatedArtPieces = [
                ...collection.artpieces,
                {
                  id: artPieceDetails.id,
                  title: artPieceDetails.title || '',
                  author: artPieceDetails.author || '',
                  date: artPieceDetails.date || '',
                  imageId: artPieceDetails.imageId,
                  imageUrl: imageUrl, // Agregar el campo imageUrl
                },
              ];
              await updateDoc(collectionDoc, { artpieces: updatedArtPieces });
            }
          } else {
            if (artPieceIndex !== -1) {
              const updatedArtPieces = [
                ...collection.artpieces.slice(0, artPieceIndex),
                ...collection.artpieces.slice(artPieceIndex + 1),
              ];
              await updateDoc(collectionDoc, { artpieces: updatedArtPieces });
            }
          }
        }),
      );

      onSave();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating art piece in collections:', error);
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
                      <div className="collection__image">
                        <img src="" alt="" />
                      </div>
                      <div className="collection-info">
                        <p className="collection__name">{collection.name}</p>
                        <p className="collection__artpieces">{collection.artpieces?.length ?? 0} Pieces</p>
                      </div>
                      <input
                        type="checkbox"
                        onChange={() => handleCollectionSelect(collection.id)}
                        checked={selectedCollections.has(collection.id)}
                      />
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
