import React, { useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { css } from '@emotion/css';
import { connect } from 'react-redux';

const styles = css`
position: absolute;
top: 10px;
right:47%;
`;

export default () => {
  const [isEnabled, setIsEnabled] = useState(localStorage.getItem('scanSound') === '1');

  const onClick = () => {
    const newVal = !isEnabled;
    setIsEnabled(newVal);
    localStorage.setItem('scanSound', newVal ? '1' : '2');
  };

  return (
    <Button className={`${styles}`} intent={Intent.PRIMARY} onClick={onClick}>
      {isEnabled ? 'Scan Sound 1' : 'Scan Sound 2'}
    </Button>
  );
};
