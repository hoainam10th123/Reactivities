import Spinner from 'react-bootstrap/Spinner'

interface Props {
    inverted?: boolean;
    context?: string;
}

export default function Loading({ inverted = true, context = 'Loading...' }: Props) {
    return (
        <Spinner variant="primary" animation="border" role="status">
            <span className="visually-hidden">{context}</span>
        </Spinner>
    );
}