import { Card, Placeholder, Badge, Button } from "react-bootstrap";

export default function ActivityListItemPlaceholder() {
    return (
        <Card>
            <Card.Header>
                <div className="d-flex align-items-center">
                    <div className="mr" style={{ position: 'relative' }}>
                        <img height={50} src='/assets/user.png' alt="" className="rounded-circle" />
                    </div>
                    <div>
                        <div aria-hidden="true">
                            <Placeholder xs={6} />
                        </div>
                        <div aria-hidden="true">
                            <Placeholder xs={6} />
                        </div>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Placeholder animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
            <Card.Footer>
                <Placeholder animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
            </Card.Footer>
            <Card.Footer className="text-muted">
                <Placeholder.Button xs={3} aria-hidden="true" />
                <Placeholder.Button xs={3} aria-hidden="true" />
            </Card.Footer>
        </Card>
    );
}