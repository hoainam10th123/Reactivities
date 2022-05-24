import { observer } from "mobx-react-lite";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { IProfile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props{
    profile: IProfile;
}

export default observer(function ProfileContent({profile}:Props) {
    const {profileStore} = useStore();
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="About" onSelect={(data, e)=> profileStore.setActiveTab(data)}>
            <Row>
                <Col sm={9}>
                    <Tab.Content style={{backgroundColor:'whitesmoke'}}>
                        <ProfilePhotos profile={profile} />
                        <ProfileFollowings eventKey={'Followers'} />
                        <ProfileFollowings eventKey={'Following'} />
                        <ProfileActivities eventKey={'Events'} />
                    </Tab.Content>
                </Col>
                <Col sm={3}>
                    <Nav style={{backgroundColor:'whitesmoke'}} variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="About" className="text-dark">About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Photos" className="text-dark">Photos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Events" className="text-dark">Events</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Followers" className="text-dark">Followers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Following" className="text-dark">Following</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Tab.Container>
    );
})