import React, { CSSProperties } from 'react';

import classes from './Button.module.scss';

function Button(
  {
    children,
    onClick,
    style
  }:
  {
    children: string,
    onClick?: () => any,
    style?: CSSProperties
  }
) {
  return (
    <div className={classes.root} onClick={onClick} style={style}>
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default Button;
