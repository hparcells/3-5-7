import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

function Button(
  {
    children,
    onClick,
    style,
    selected = true
  }:
  {
    children: string,
    onClick?: () => any,
    style?: CSSProperties,
    selected?: boolean
  }
) {
  return (
    <div className={clsx(classes.root, selected ? classes.selected : null)} onClick={onClick} style={style}>
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default Button;
