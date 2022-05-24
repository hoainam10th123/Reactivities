import { observer } from 'mobx-react-lite';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/store';
import './menubar.css';

export default observer(function MenuBar() {
  const { userStore } = useStore();
  const { isLoggedIn, user, logout } = userStore;

  return (
    <Navbar bg="dark" variant="dark">
      <Container className='justify-content-between' style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Navbar.Brand>
          <img
            style={{ marginRight: 6 }}
            alt=""
            src="/assets/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <Link to="/activities">Reactivities</Link>
        </Navbar.Brand>
        <Nav>
          <div className='d-flex'>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/errors" className='nav-link'>Errors</Link>
            <Link to="/create-activity" style={{ marginRight: 5 }}>
              <Button variant="success">Create activity</Button>
            </Link>
          </div>
        </Nav>
        <div>
          {isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-success">
                <img src={user?.image || '/assets/user.png'} height="25" alt='img user' />
                {user?.displayName}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item as={Link} to={`/profile/${user?.username}`}>                
                    My profile             
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : <></>}
        </div>
      </Container>
    </Navbar>
  );
})