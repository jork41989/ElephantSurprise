import React from 'react';
import Login from '../auth/login';
import Signup from '../auth/signup';
import SearchUser from '../search/searchUser';
import './modal.css';


function Modal({ type, closeModal, exchange_id }) {
  if (!type) {
    return null;
  }

  let component;
  switch(type){
    case 'login':
      component = <Login closeModal={closeModal}/>;
      break;
    case 'signup':
      component = <Signup closeModal={closeModal}/>;
      break;
    case 'search_user':
      component = <SearchUser closeModal={closeModal} exchange_id={exchange_id}/>;
      break;
    default:
      return null;
  }



  return (
    <div className={"modal-background"} onClick={closeModal}>
      <div className={"modal-child"} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
