import { css } from 'emotion';
import styled from '@emotion/styled';
import { Callout } from '@blueprintjs/core';

export const checkoutsListStyles = css``;

export const CheckoutsListItem = styled(Callout)`
  width: 100%;
  margin-bottom: 2px;
  padding: 0.1em 0;
  font-size: 0.8em;

  h5 {
    line-height: 12px;
    margin-bottom: 0;
    font-size: 1em;
  }
`;

export const datumStyles = css`
  padding-right: 3px;
`;
