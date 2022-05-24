import { SyntheticEvent, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { format } from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
    data: IActivity;
}
export default function ActivityListItem({ data }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Card>
            {data.isCancelled && (
                <h6 className="bg-danger text-center" style={{ color: 'white', padding: 8, borderRadius: 5 }}>Cancelled</h6>
            )}

            <Card.Header>
                <div className="d-flex align-items-center">
                    <div className="mr" style={{ position: 'relative' }}>
                        <img height={50} src={data.host?.image || '/assets/user.png'} alt="" className="rounded-circle" />
                    </div>
                    <div>
                        <Link to={`/activities/${data.id}`} className="text-primary"> {data.title}</Link>
                        <div className="text-muted">Host by {data.host?.displayName}</div>
                        {data.isHost && (
                            <Badge bg="warning" text="dark">You are hosting activity</Badge>
                        )}
                        {data.isGoing && !data.isHost && (
                            <Badge bg="success">You are going to activity</Badge>
                        )}
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div>
                    <div>{data.description}</div>
                    <div className="text-muted">{format(data.date!, 'dd MMM yyyy h:mm aa')}</div>
                    <div>{data.city}, {data.venue}</div>
                    <div><Badge bg="success">{data.category}</Badge></div>
                </div>
            </Card.Body>
            <Card.Footer>
                <ActivityListItemAttendee attendees={data.attendees!} />
            </Card.Footer>
            <Card.Footer className="text-muted">
                2 days ago

                <Button name={data.id}
                    disabled={loading && target === data.id}
                    onClick={(e) => handleActivityDelete(e, data.id)}
                    variant="danger"
                    style={{ float: "right", marginLeft: 5 }}>
                    {loading && target === data.id ? 'Loading…' : 'Delete'}
                </Button>
                <Link to={`/activities/${data.id}`} style={{ float: "right" }}>
                    <Button variant="success">View</Button>
                </Link>
            </Card.Footer>
        </Card>
    );
}