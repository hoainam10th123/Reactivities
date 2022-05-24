import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { IProfile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";


interface Props {
    attendees: IProfile[];
}

export default function ActivityListItemAttendee({ attendees }: Props) {
    const styles = {
        borderColor: 'green', borderWidth: 3, borderStyle:'solid'
    }
    return (
        <ListGroup horizontal>
            {attendees.map(data => (
                <OverlayTrigger
                    trigger="click"
                    key={data.username}
                    overlay={
                        <Popover id={`popover-positioned-${data.username}`}>
                            <Popover.Header as="h3">Popover</Popover.Header>
                            <Popover.Body>
                                <ProfileCard profile={data} />
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <ListGroup.Item >
                        <img 
                            style={data.following ? styles : undefined}
                            className="rounded-circle" 
                            height={30} 
                            src={data.image || '/assets/user.png'} alt="" />
                    </ListGroup.Item>
                </OverlayTrigger>
            ))}
        </ListGroup>
    );
}