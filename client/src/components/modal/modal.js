import React from 'react';
import Login from '../auth/login'
import Signup from '../auth/signup'
import './modal.css';


function Modal ({type, closeModal}) {
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
