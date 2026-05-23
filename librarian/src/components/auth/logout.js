import React from 'react';
import { authInstance as auth } from './auth';
import { Button, Intent } from '@blueprintjs/core';
import { css } from '@emotion/css';
import { connect } from 'react-redux';

const styles = css`
  position: absolute;
  right: 1.2rem;
  top: 1rem;
`;

const onClick = () => {
  auth.logout();
};

export default () => (
  <Button className={`${styles}`} intent={Intent.DANGER} onClick={() => onClick()}>
    Logout
  </Button>
);
