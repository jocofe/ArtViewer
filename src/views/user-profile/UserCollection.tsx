import { useContext, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/config';
import { Button } from '../../components/Buttons/Buttons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import { Collection } from '../../models/collection';
import { UserContext } from '../../context/UserContextProvider';
import { useParams } from 'react-router-dom';
import { ModalDefault } from '../../components/Dialogs/ModalDefault';
import { Navigate } from 'react-router-dom';

export const UserCollection = () => {
  const { userData } = useContext(UserContext);
  const username = userData?.username;
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collectionDeleted, setCollectionDeleted] = useState(false);

  useEffect(() => {
    if (userData && collectionId) {
      const fetchCollection = async () => {
        try {
          const collectionDoc = await getDoc(doc(db, `users/${userData.email}/collections/${collectionId}`));
          if (collectionDoc.exists()) {
            setCollectionData({ id: collectionDoc.id, ...collectionDoc.data() } as Collection);
            setNewName(collectionDoc.data().name);
            setNewDescription(collectionDoc.data().description);
          } else {
            console.error('No collection found');
          }
        } catch (error) {
          console.error('Error fetching collection data:', error);
        }
      };

      fetchCollection();
    }
  }, [userData, collectionId]);

  const handleEditCollection = () => {
    setShowEditModal(true);
  };

  const handleDeleteCollection = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCollectionConfirm = async () => {
    if (!userData || !collectionId) return;

    try {
      await deleteDoc(doc(db, `users/${userData.email}/collections/${collectionId}`));
      setCollectionDeleted(true);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData || !collectionData) return;

    try {
      await updateDoc(doc(db, `users/${userData.email}/collections/${collectionId}`), {
        name: newName,
        description: newDescription,
      });
      setShowEditModal(false);
      setCollectionData(prevState => {
        if (prevState) {
          return { ...prevState, name: newName, description: newDescription };
        }
        return null;
      });
    } catch (error) {
      console.error('Error updating collection:', error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  if (!collectionData) {
    return <div>Loading...</div>;
  }

  if (collectionDeleted) {
    return <Navigate to={`/${username}`} />;
  }

  return (
    <div className="usercollection-wrapper">
      <div className="usercollection-card">
        <div className="usercollectioncard-wrapper">
          <div className="usercollection__info">
            <h1 className="usercollection__name h4">{collectionData.name}</h1>
            <p className="usercollection__count">{collectionData.artpieces.length} pieces</p>
            <p className="usercollection__description">{collectionData.description}</p>
          </div>
          <div className="usercollection-buttons">
            <Button onClick={handleEditCollection}>Edit Collection</Button>
            <Button onClick={handleDeleteCollection}>Delete Collection</Button>
          </div>
        </div>
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {collectionData.artpieces.map(artpiece => (
              <ArtCard
                key={artpiece.id}
                title={artpiece.title}
                imageId={artpiece.imageId}
                author={artpiece.author}
                date={artpiece.date}
                id={artpiece.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {showEditModal && (
        <ModalDefault title="Edit Collection" onClose={handleCloseModal} show={showEditModal}>
          <form onSubmit={handleSubmit} className="collection-modal-wrapper">
            <div className="collection-modal__content">
              <div className="collection-modal__form">
                <div className="collection-modal__name">
                  <div className="collection-modal__text">
                    <p>Name</p> <p>64</p>
                  </div>
                  <input
                    className="collection-input__name"
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    maxLength={64}
                    required
                  />
                </div>
                <div className="collection-modal__description">
                  <div className="collection-modal__text">
                    <p>Description (optional)</p> <p>160</p>
                  </div>
                  <input
                    className="collection-input__description"
                    type="text"
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    maxLength={160}
                  />
                </div>
              </div>
              <div className="collection-modal__buttons">
                <Button color="sub_primary" type="submit">
                  Save Changes
                </Button>
                <Button type="button" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </ModalDefault>
      )}
      {showDeleteModal && (
        <ModalDefault title="Delete Collection" onClose={handleCloseModal} show={showDeleteModal}>
          <div className="collection-modal__content">
            <div className="collection-modal__text">
              <p>You are about to delete this collection. Are you sure?</p>
            </div>
            <div className="collection-modal__buttons">
              <Button color="sub_primary" onClick={handleDeleteCollectionConfirm}>
                Delete Collection
              </Button>
              <Button type="button" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalDefault>
      )}
    </div>
  );
};
