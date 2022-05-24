import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Badge, Button, Spinner } from "react-bootstrap";
import Loading from "../../../app/layout/loadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFillers";
import ActivityListItem from "./activityListItem";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";


export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, groupActivities, setPagingParams, pagination, loadingInitial } = activityStore;

    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    /* if (activityStore.loadingInitial && !loadingNext) return (
        <div className='centerd-loading'>
            <Loading context='Loading activities' />
        </div>
    ); */

    return (
        <div className="row">
            <div className="col-8">
                {loadingInitial && !loadingNext ? (
                    <> <ActivityListItemPlaceholder /> <ActivityListItemPlaceholder /> </>
                ): groupActivities.map(([group, activities]) => (
                    <div key={group} style={{ marginBottom: 5 }}>
                        <Badge bg="primary">{group}</Badge>
                        {activities.map(data => (
                            <ActivityListItem key={data.id} data={data} />
                        ))}
                    </div>
                ))}

                <div className="text-center">
                    <Button variant="success" disabled={loadingNext || pagination?.totalPages === pagination?.currentPage} onClick={handleGetNext}>
                        {loadingNext ? (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"/>
                        ) : null}
                        {loadingNext ? 'Loading...' : 'More...'}
                    </Button>
                </div>
            </div>
            <div className="col-4">
                <ActivityFilters />
            </div>
        </div>
    );
})