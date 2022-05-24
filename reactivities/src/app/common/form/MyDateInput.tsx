
import { useField } from "formik";
import { Form } from "react-bootstrap";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";


export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Group className="mb-3">
            <DatePicker className="form-control"
                {...field} {...props} 
                selected={(field.value && new Date(field.value)) || null}
                onChange={(value) => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <div className="text-danger">{meta.error}</div>
            ) : null}
        </Form.Group>
    );
}