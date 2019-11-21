import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

function Button(
  {
    children,
    onClick,
    style,
    selected = true,
    disabled = false
  }:
  {
    children: string,
    onClick?: () => any,
    style?: CSSProperties,
    selected?: boolean,
    disabled?: boolean
  }
) {
  function handleClick() {
    if(!disabled && onClick) {
      onClick();
    }
  }

  return (
    <div
      className={clsx(
        classes.root,
        selected ? classes.selected : null,
        disabled ? classes.disabled : null
      )}
      onClick={handleClick} style={style}
    >
      <p className={classes.buttonText}>
        {children}
      </p>
    </div>
  );
}

export default Button;
