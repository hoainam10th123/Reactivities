import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, ButtonGroup, Col, ListGroup, Row, Tab } from "react-bootstrap";
import PhotoUploadWidget from "../../app/common/imagesUpload/PhotoUploadWidget";
import { IPhoto, IProfile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: IProfile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane eventKey="Photos">
            <Row>
                <Col sm={12}>
                    <div className="d-flex justify-content-between">
                        <h4>Photos</h4>
                        {isCurrentUser && (
                            <Button
                                style={{ float: 'right' }}
                                variant="success"
                                onClick={() => setAddPhotoMode(!addPhotoMode)}
                            >
                                {addPhotoMode ? 'Cancel' : 'Add photo'}
                            </Button>
                        )}
                    </div>
                </Col>
                <Col sm={12}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <ListGroup horizontal>
                            {profile.photos?.map(photo => (
                                <ListGroup.Item key={photo.id} className="d-flex flex-column">
                                    <img height={120} className="rounded" src={photo.url} alt="" />
                                    {isCurrentUser && (
                                        <ButtonGroup size="sm">
                                            <Button 
                                                onClick={(e) => handleSetMainPhoto(photo, e)}
                                                name={`main${photo.id}`} 
                                                disabled={photo.isMain || (loading && target === `main${photo.id}`)} 
                                                variant="outline-success">{loading && target === `main${photo.id}` ? 'loading...': 'main'}
                                            </Button>

                                            <Button 
                                                onClick={(e) => handleDeletePhoto(photo, e)}
                                                name={`del${photo.id}`} 
                                                disabled={photo.isMain || (loading && target === `del${photo.id}`)}  
                                                variant="outline-danger">{loading && target === `del${photo.id}` ? 'loading…' : 'del'}
                                            </Button>
                                        </ButtonGroup>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Tab.Pane>
    );
})