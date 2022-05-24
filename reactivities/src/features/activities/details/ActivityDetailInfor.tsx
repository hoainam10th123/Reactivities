import { observer } from "mobx-react-lite";
import { Card, ListGroup } from "react-bootstrap";
import { IActivity } from "../../../app/models/activity";
import { format } from 'date-fns';

interface Props {
    activity: IActivity
}

export default observer(function ActivityDetailInfor({ activity }: Props) {
    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>{activity.description}</ListGroup.Item>
                <ListGroup.Item>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</ListGroup.Item>
                <ListGroup.Item>{activity.venue}, {activity.city}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
})