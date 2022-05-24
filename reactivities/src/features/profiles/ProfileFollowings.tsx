import { observer } from "mobx-react-lite";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { useStore } from "../../app/stores/store";

interface Props{
    eventKey: string;
}

export default observer(function ProfileFollowings({eventKey}: Props) {
    const { profileStore } = useStore();
    const { profile, followings, activeTab } = profileStore;

    return (
        <Tab.Pane eventKey={eventKey}>
            <Row>
                <Col sm={12}>
                    <h4 className="text-primary">{activeTab === 'Following' ? `People following ${profile!.displayName}` : `People ${profile?.displayName} is following`}</h4>
                </Col>
                <Col sm={12}>
                    <ListGroup horizontal>
                        {followings.map(profile => (
                            <ListGroup.Item key={profile.username} className="d-flex flex-column">
                                <img height={120} className="rounded" src={profile.image || '/assets/user.png'} alt="" />
                                <h4 className="text-success text-center">{profile.displayName}</h4>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Pane>
    );
})