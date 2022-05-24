import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);

    function handleNotFound() {        
        axios.get(baseUrl + '/buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + '/buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + '/buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + '/buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + '/activities/notaguid').catch(err => {
            console.log(err);
            setErrors(err);
        });//fix undefined, 400
    }

    function handleValidationError() {
        axios.post(baseUrl + '/activities', {}).catch(err => {
            console.log(err);
            setErrors(err);
        });//fix undefined, 400
    }

    return (
        <>
        <div>
            <Button onClick={handleNotFound} variant="primary">Not Found</Button>
            <Button onClick={handleBadRequest} variant="secondary">Bad Request</Button>
            <Button onClick={handleValidationError} variant="success">Validation Error</Button>
            <Button onClick={handleServerError} variant="warning">Server Error</Button>
            <Button onClick={handleUnauthorised} variant="danger">Unauthorised</Button>
            <Button onClick={handleBadGuid} variant="dark">Bad Guid</Button>
        </div>
        <div>
            {errors && <ValidationErrors errors={errors} />}
        </div>        
        </>        
    );
}