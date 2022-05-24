import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../app/layout/loadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(username!);
        return ()=>{setActiveTab('');}
    }, [loadProfile, username])

    if (loadingProfile) return (
        <div className='centerd-loading'>
            <Loading context='Loading profile' />
        </div>
    );

    return (
        <div className="row">
            <div className="col-12">
                {profile &&
                    <>
                        <ProfileHeader profile={profile}/>
                        <ProfileContent profile={profile} />
                    </>
                }
            </div>
        </div>
    )
})