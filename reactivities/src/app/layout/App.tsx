import './style.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/homePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import MenuBar from './navbar';
import ActivityDetails from '../../features/activities/details/ActivityDetail';
import TestErrors from '../../features/errors/testError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/notfound';
import ServerErrorView from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import Loading from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateWrapper from './PrivateRoute';

function App() {
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) userStore.getUser().finally(() => { commonStore.setAppLoaded() });
    else commonStore.setAppLoaded();
  }, [commonStore, userStore])

  if (!commonStore.appLoaded)
    return (
      <div className='centerd-loading'>
        <Loading context='Loading app' />
      </div>
    );
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <ModalContainer />
      <MenuBar />
      <div className="container">
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="/activities"
            element={(
              <PrivateWrapper><ActivityDashboard /></PrivateWrapper>
            )}/>

          <Route path='/activities/:id' element={(
            <PrivateWrapper><ActivityDetails /></PrivateWrapper>
          )}/>

          <Route path='/create-activity' element={(
            <PrivateWrapper><ActivityForm /></PrivateWrapper>
          )}/>

          <Route path='/manage/:id' element={(
            <PrivateWrapper><ActivityForm /></PrivateWrapper>
          )}/>

          <Route path='/profile/:username' element={(
            <PrivateWrapper><ProfilePage /></PrivateWrapper>
          )}/>

          <Route path='/errors' element={(
            <PrivateWrapper><TestErrors /></PrivateWrapper>
          )} />
          
          <Route path='/server-error' element={<ServerErrorView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default observer(App);
