import { useField } from "formik";
import { Form } from "react-bootstrap";

interface Props {
    row: number;
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props);
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <textarea rows={props.row} className="form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="text-danger">{meta.error}</div>
            ) : null}
        </Form.Group>
    );
}