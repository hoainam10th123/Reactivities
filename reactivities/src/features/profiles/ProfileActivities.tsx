import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useStore } from "../../app/stores/store";
import ActivityItemEvent from "./ActivityItemEvent";

interface Props {
    eventKey: string;
}

export default observer(function ProfileActivities({ eventKey }: Props) {
    const { profileStore:{userActivities, setActiveTab} } = useStore();

    useEffect(() => {
        setActiveTab('future');
        return () => setActiveTab('');
    }, []);

    return (
        <Tab.Pane eventKey={eventKey}>
            <Tabs
                onSelect={(data, e) => {
                    setActiveTab(data);
                }}
                defaultActiveKey="future"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="future" title="Future Events">
                    <Row>
                        {userActivities.map(activity => (
                            <Col sm={3} key={activity.id}>
                                <ActivityItemEvent userActivity={activity} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="past" title="Past Events">
                    <Row>
                        {userActivities.map(activity => (
                            <Col sm={3} key={activity.id}>
                                <ActivityItemEvent userActivity={activity} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="hosting" title="Hosting">
                    <Row>
                        {userActivities.map(activity => (
                            <Col sm={3} key={activity.id}>
                                <ActivityItemEvent userActivity={activity} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Tab.Pane>
    );
})