import React from 'react';

import classes from './Mark.module.scss';
import clsx from 'clsx';

function Mark(
  {
    marked,
    selected,
    onClick
  }:
  {
    marked: boolean,
    selected: boolean,
    onClick: () => any
  }
) {
  function handleOnClick() {
    // Check if we can even.
    if(!marked && !selected) {
      onClick();
    }
  }

  return (
    <div
      className={clsx(
        classes.root,
        marked ? classes.marked : null,
        selected ? classes.selected : null
      )}
      onClick={handleOnClick}
    />
  );
}

export default Mark;
