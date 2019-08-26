import React from 'react';
import Styles from './SubmitButton.module.scss';

export const SubmitButton = ({ ...props }) => {
  return (
    <button className={Styles['submit-button']} {...props}>
      {props.children}
    </button>
  );
};
