import { observer } from "mobx-react-lite";
import { ListGroup } from "react-bootstrap";
import Calendar from "react-calendar";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();

    return (
        <>
            <ListGroup as="ul" style={{marginTop: 25}}>
                <ListGroup.Item as="li" active>
                    Filters
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setPredicate('all', 'true')}>All activities</ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setPredicate('isGoing', 'true')}>
                    I'm going
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setPredicate('isHost', 'true')}>I'm hosting</ListGroup.Item>
            </ListGroup>
            <br/>
            <Calendar onChange={(date:any) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            /> 
        </>         
    );
})