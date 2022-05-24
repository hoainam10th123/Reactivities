import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../../app/models/activity";

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    function handleFormSubmit(activity: ActivityFormValues){
        if(!activity.id){
            let newActivity = {
                ...activity,
                id: uuidv4()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        }else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }
    /* 
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    } */

    const validation_Schema = Yup.object().shape({
        title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
      });

    useEffect(()=>{
        if(id) loadActivity(id).then(ac => setActivity(new ActivityFormValues(ac)));
        else{
            setActivity(new ActivityFormValues())
        }
    }, [id, loadActivity])

    if (loadingInitial) return (
        <div className='centerd-loading'>
            <Loading />
        </div>
    );

    return (
        <Formik 
        validationSchema={validation_Schema}
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form style={{backgroundColor: "white", padding: 10}} 
                onSubmit={handleSubmit} autoComplete='off'>
                <h5 className="text-danger">Activity information</h5>
                <MyTextInput name="title" placeholder="Title" label="Title"/>
                <MyTextArea row={3} name="description" placeholder="Description" label="Description"/>
                <MySelectInput name="category" label="Category"/>
                <MyDateInput 
                    name="date" 
                    placeholderText="Date"
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'                    
                />
                <h5 className="text-danger">Activity location</h5>
                <MyTextInput name="city" placeholder="City" label="City"/>
                <MyTextInput name="venue" placeholder="Venue" label="Venue"/> 
            
                <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">                
                    {isSubmitting ? 'Loading…' : 'Submit'}
                </Button>
                <Link to="/activities">
                    <Button variant="secondary" type="button">Cancel</Button>
                </Link>            
            </Form>
            )}
        </Formik>        
    );
})