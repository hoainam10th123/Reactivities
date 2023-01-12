import './style.css';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import MenuBar from './navbar';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import Loading from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

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
        <Outlet />
      </div>
    </>
  );
}

export default observer(App);
