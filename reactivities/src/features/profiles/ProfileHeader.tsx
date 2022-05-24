import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { IProfile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props{
    profile: IProfile;
}

export default observer(function ProfileHeader({profile}: Props) {
    const styles = {
        backgroundColor: 'whitesmoke', 
        padding: 15, 
        borderRadius: 5,
        marginBottom: 20
    }
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();        
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    if (userStore.user?.username === profile.username) return null;
        
    return (
        <div style={styles} className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <div>
                    <img height={120} src={profile.image || '/assets/user.png'} alt="" className="rounded-circle" />
                </div>
                <div style={{fontWeight:'bold', fontSize: 25, marginLeft: 10}}>
                    {profile.displayName}
                </div>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex">                    
                    <div className="d-flex flex-column">
                        <div style={{fontSize: 40, textAlign: 'center', fontWeight:'bold'}}>{profile.followersCount}</div>
                        <div style={{fontSize: 20, padding: 5, fontWeight:'bold'}}>Follower</div>
                    </div>
                    <div className="d-flex flex-column">
                        <div style={{fontSize: 40, textAlign: 'center', fontWeight:'bold'}}>{profile.followingCount}</div>
                        <div style={{fontSize: 20, padding: 5, fontWeight:'bold'}}>Following</div>
                    </div>
                </div>
                <div><Dropdown.Divider /></div>
                <div className="d-grid gap-2">
                    <Button 
                        disabled={loading}
                        onClick={(e) => handleFollow(e, profile.username)} 
                        variant={profile.following ? 'outline-warning' : 'success'}>
                            {loading ? 'loading...' : profile.following ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>
            </div>
        </div>
    );
})