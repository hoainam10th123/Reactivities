import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer(function RegisterForm(){
    const {userStore} = useStore();
    const validation_Schema = Yup.object().shape({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      });

    return (
        <Formik initialValues={{displayName:'', username:'', email: '', password:'', error: null}}
            validationSchema={validation_Schema}
            onSubmit={(value, {setErrors}) => userStore.register(value)            
            .catch(err => setErrors({error: err}))}
        >
             {({handleSubmit, isValid, isSubmitting, dirty, errors}) => (
                 <Form style={{backgroundColor: "white", padding: 10}} 
                    onSubmit={handleSubmit} autoComplete='off'>
                 <MyTextInput name="displayName" placeholder="Display Name" label="Display Name"/>
                 <MyTextInput name="username" placeholder="Username" label="Username"/>
                 <MyTextInput name="email" placeholder="Email" label="Email"/>
                 <MyTextInput type="password" name="password" placeholder="Password" label="Password"/>
                 
                 <ErrorMessage name="error" render={()=> <div className="text-danger">{errors.error}</div>}/>             
                 
                 <Button disabled={isSubmitting || !dirty || !isValid} variant="success" type="submit">                
                     {isSubmitting ? 'Loading...' : 'Register'}
                 </Button>
             </Form>
             )}
        </Formik>
    );
})