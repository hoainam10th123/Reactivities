import { format } from "date-fns";
import { Card } from "react-bootstrap";
import { IUserActivity } from "../../app/models/profile";

interface Props {
    userActivity: IUserActivity;
}

export default function ActivityItemEvent({ userActivity }: Props) {
    return (
        <Card>
            <Card.Img
                variant="top"
                src={`/assets/categoryImages/${userActivity.category}.jpg`}
                style={{ minHeight: 100, objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{userActivity.title}</Card.Title>

                <div className="text-muted text-center">{format(new Date(userActivity.date), 'do LLL')}</div>
                <div className="text-muted text-center">{format(new Date(userActivity.date), 'h:mm a')}</div>

            </Card.Body>
        </Card>
    );
}