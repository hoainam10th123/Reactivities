import { observer } from "mobx-react-lite";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from 'date-fns';
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: IActivity
}

export default observer(function ActivityDetailHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();

    return (
        <Card>
            {activity.isCancelled && (
                <div className="badge" style={{
                    position: 'absolute', zIndex: 1000, left: -20, top: 20, fontSize:18
                }}>
                    <Badge bg="danger">Cancelled</Badge>
                </div>
            )}

            <Card.Img variant="top" src={`/assets/categoryImages/${activity.category}.jpg`} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '5%',
                width: '100%',
                height: 'auto',
                color: 'white'
            }}>
                <h3 className="no-margin-bottom">{activity.title}</h3>
                <p className="no-margin-bottom">{format(activity.date!, 'dd MMM yyyy')}</p>
                <p className="no-margin-bottom">
                    <Link to={`/profile/${activity.host?.username}`}>
                        Hosted by <strong>{activity.host?.displayName}</strong>
                    </Link>
                </p>
            </div>
            <Card.Body>
                {activity.isHost ? (
                    <>
                        <Button disabled={loading} variant="danger" style={{ float: 'left' }} onClick={cancelActivityToggle}>
                            {loading ? 'Loading...' : activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                        </Button>
                        <Link to={`/manage/${activity.id}`}>
                            <Button disabled={activity.isCancelled} variant="warning" style={{ float: 'right' }}> Manage Event </Button>
                        </Link>
                    </>
                ) : activity.isGoing ? (
                    <Button variant="secondary"
                        disabled={loading}
                        onClick={updateAttendance}>
                        {loading ? 'Loading...' : 'Cancel attendance'}
                    </Button>
                ) : (
                    <Button disabled={loading || activity.isCancelled} variant="success" onClick={updateAttendance}> {loading ? 'Loading...' : 'Join Activity'} </Button>
                )}
            </Card.Body>
        </Card>
    );
})