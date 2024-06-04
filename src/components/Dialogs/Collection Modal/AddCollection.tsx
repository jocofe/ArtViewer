import { useContext, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/config';
import { Button } from '../../Buttons/Buttons';
import { FilterCollectionBar } from '../../Form/FilterCollectionBar';
import { UserContext } from '../../../context/UserContextProvider';
import { AddCollectionModalProps, CollectionUser, NewCollectionFormInputs } from '../../../models/collection';
import { ArrowLeft, ArrowRight } from '../../Icons/icons';

export const AddCollectionModal = ({ collections, artPieceDetails, onClose, onSave }: AddCollectionModalProps) => {
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<CollectionUser[]>(collections);
  const [userCollections, setUserCollections] = useState<CollectionUser[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const collectionsPerPage = 3;
  const { userData } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm<NewCollectionFormInputs>();

  const fetchCollections = async () => {
    if (!userData) return;
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

  useEffect(() => {
    fetchCollections();
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
    if (isCreatingNewCollection) {
      setIsCreatingNewCollection(false);
      reset();
    } else {
      onClose();
    }
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
      await fetchCollections();
      setIsCreatingNewCollection(false);
      reset();
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
                  imageUrl: imageUrl,
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

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const indexOfLastCollection = currentPage * collectionsPerPage;
  const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
  const currentCollections = filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection);

  return (
    <div className="collection-modal-wrapper">
      <div className="collection-modal__content">
        {isCreatingNewCollection ? (
          <form onSubmit={handleSubmit(onSubmit)} className="collection-modal-wrapper">
            <div className="collection-modal__content">
              <div className="collection-modal__form">
                <div className="collection-modal__name">
                  <div className="collection-modal__text">
                    <p>Name</p> <p>64</p>
                  </div>
                  <input
                    className="collection-input__name"
                    type="text"
                    {...register('name', { required: true, maxLength: 64 })}
                  />
                </div>
                <div className="collection-modal__description">
                  <div className="collection-modal__text">
                    <p>Description (optional)</p> <p>160</p>
                  </div>
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
              {currentCollections.length > 0 ? (
                currentCollections.map(collection => (
                  <div className="collections-wrapper" key={collection.id}>
                    <div className="collection">
                      <div className="collection__image">
                        {collection.artpieces && collection.artpieces.length > 0 ? (
                          <img className="image-collection" src={collection.artpieces[0].imageUrl} alt="" />
                        ) : (
                          <div className="placeholder-image"></div>
                        )}
                      </div>
                      <div className="collection-info">
                        <p className="collection__name">{collection.name}</p>
                        <p className="collection__artpieces">{collection.artpieces?.length ?? 0} Pieces</p>
                      </div>
                      <input
                        className="checkbox-collection"
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
            <div className="collection-modal__pagination">
              <button type="button" onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-icon">
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={indexOfLastCollection >= filteredCollections.length}
                className="pagination-icon"
              >
                <ArrowRight />
              </button>
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
