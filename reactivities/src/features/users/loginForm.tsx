import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm(){
    const {userStore} = useStore();
    
    return (
        <Formik initialValues={{email: '', password:'', error: null}}
            onSubmit={(value, {setErrors}) => userStore.login(value)
            .catch(err => setErrors({error: 'Invalid email or password'}))}
        >
             {({handleSubmit, isValid, isSubmitting, dirty, errors}) => (
                 <Form style={{backgroundColor: "white", padding: 10}} 
                    onSubmit={handleSubmit} autoComplete='off'>
                 <MyTextInput name="email" placeholder="Email" label="Email"/>
                 <MyTextInput type="password" name="password" placeholder="Password" label="Password"/>
                 
                 <ErrorMessage name="error" render={()=> <div className="text-danger">{errors.error}</div>}/>             
                 
                 <Button disabled={isSubmitting || !dirty || !isValid} variant="success" type="submit">                
                     {isSubmitting ? 'Loading...' : 'Login'}
                 </Button>
             </Form>
             )}
        </Formik>
    );
})