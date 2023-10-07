import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { blockStyles, squatStyles } from './pageBlock.styles';

const PageBlock = ({ children, className = '', squat = false }) => {
  let styles = squat ? `${squatStyles} ${blockStyles}` : blockStyles;
  styles = `${className} ${styles}`;
  const elevation = squat ? Elevation.FOUR : Elevation.ZERO;

  return (
    <Card elevation={elevation} className={styles}>
      {children}
    </Card>
  );
};

export default PageBlock;
