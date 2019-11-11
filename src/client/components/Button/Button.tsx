import React from 'react';

import classes from './Button.module.scss';

function Button(
  {
    children,
    onClick
  }:
  {
    children: string,
    onClick?: any
  }
) {
  return (
    <div className={classes.root} onClick={onClick}>
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default Button;
