import React from 'react';

import classes from './Mark.module.scss';
import clsx from 'clsx';

function Mark(
  {
    marked,
    selected,
    onClick,
    row,
    index
  }:
  {
    marked: boolean,
    selected: boolean,
    onClick: (row: number, index: number) => any,
    row: number,
    index: number
  }
) {
  function handleOnClick() {
    // Check if we can even.
    if(!marked && !selected) {
      onClick(row, index);
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
