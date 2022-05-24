import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfor from "./ActivityDetailInfor";
import ActivityDetailSideBar from "./ActivityDetailSideBar";


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity])

    if (loadingInitial || !activity) return (
        <div className='centerd-loading'>
            <Loading />
        </div>
    );

    return (
        <div className="row">
            <div className="col-8">
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfor activity={activity}/>
                <ActivityDetailChat activityId={activity.id}/>
            </div>
            <div className="col-4">
                <ActivityDetailSideBar activity={activity} />
            </div>
        </div>
    );
})