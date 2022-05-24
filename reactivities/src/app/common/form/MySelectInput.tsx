import { useField } from "formik";
import { Form } from "react-bootstrap";
import { categoryOptions } from "../options/categoryOption";

interface Props {
    name: string;
    label?: string;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props);
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Form.Select onChange={(e) => helpers.setValue(e.currentTarget.value)}
                value={field.value || undefined}
            >                
                {categoryOptions.map((data:any) =>(
                    <option key={data.value} value={data.value}>{data.text}</option>
                ))} 
            </Form.Select>
        </Form.Group>
    );
}