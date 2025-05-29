import styles from './Button.module.css';
import React from 'react';

const Button = (props) => {
   console.log('Button Component');
   return (
      <button
         type={props.type || "button"}
         className={`${styles.button} ${props.className}`}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
};

export default React.memo(Button);
