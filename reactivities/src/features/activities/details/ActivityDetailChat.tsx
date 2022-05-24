import { Formik, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailChat({ activityId }: Props) {

    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) commentStore.createHubConnection(activityId);

        return () => {
            commentStore.clearComments();
        }
    }, [activityId])

    return (
        <Card>
            <h4 className="text-center bg-success" style={{ color: 'white', padding: 10 }}>Chat about this event</h4>
            <Card.Body>
                <ul className="non-list-style">
                    {commentStore.comments.map(comment => (
                        <li key={comment.id}>
                            <div className="d-flex">
                                <div className="mr">
                                    <img height={50} className="rounded" src={comment.image || '/assets/user.png'} alt="" />
                                </div>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{comment.displayName}</span>
                                    <span className="text-muted">{formatDistanceToNow(comment.createdAt)}</span>
                                    <div style={{ fontWeight: 'bold' }}>{comment.body}</div>
                                    <div className="text-muted">reply</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <Formik
                    onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object().shape({
                        body: Yup.string().required()
                    })}
                >
                    {({ isValid, handleSubmit }) => (
                        <Form>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <textarea className="form-control"
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
})