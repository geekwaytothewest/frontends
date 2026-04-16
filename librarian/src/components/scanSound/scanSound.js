import React, { useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { css } from '@emotion/css';

const styles = css`
position: absolute;
top: 10px;
right:47%;
`;

export default () => {
  const [scanSoundTheme, setScanSoundTheme] = useState(localStorage.getItem('scanSound'));

  const onClick = () => {
    const newValue = scanSoundTheme === '1' ? '2' : (scanSoundTheme === '2' ? '0' : '1');
    setScanSoundTheme(newValue);
    localStorage.setItem('scanSound', newValue);
  };

  return (
    <Button className={`${styles}`} intent={Intent.PRIMARY} onClick={onClick}>
      {scanSoundTheme === '1' ? 'Scan Sound 1' : (scanSoundTheme === '2' ? 'Scan Sound 2' : 'Scan Sound Off')}
    </Button>
  );
};
