import { observer } from "mobx-react-lite";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";

interface Props {
    activity: IActivity;
}

export default observer(function ActivityDetailSideBar({ activity: { attendees, host } }: Props) {
    if (!attendees) return null;
    return (
        <Card>
            <ListGroup>
                <ListGroup.Item className="bg-success text-center" style={{ color: 'white' }}>
                    {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
                </ListGroup.Item>
                {attendees.map(data => (
                    <ListGroup.Item key={data.username}>
                        <div className="d-flex align-items-center">
                            <div className="mr">
                                <img height={50} className="rounded" src={data.image || '/assets/user.png'} alt="" />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Link to={`/profile/${data.username}`}>
                                    <div className="text-primary" style={{ fontWeight: 'bold' }}>{data.displayName}</div>
                                </Link>

                                {data.following && (
                                    <div className="text-warning">
                                        Following
                                    </div>
                                )}

                                {data.username === host?.username && (
                                    <div className="badge" style={{
                                        position: 'absolute',
                                        right: -200,
                                        top: 0
                                    }}><Badge bg="danger">Host</Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}

            </ListGroup>
        </Card>
    );
})