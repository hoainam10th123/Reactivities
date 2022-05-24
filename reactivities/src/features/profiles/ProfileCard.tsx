import { observer } from "mobx-react-lite";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProfile } from "../../app/models/profile";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card>
            <Card.Img variant="top" src={profile.image || '/assets/user.png'} />
            <Card.Body>
                <Card.Title>
                    <Link to={`/profile/${profile.username}`} className='text-primary'>
                        {profile.displayName}
                    </Link>
                </Card.Title>
                <Card.Text>
                    Bio go here
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{profile.followersCount} followers</Card.Footer>
        </Card>
    );
})