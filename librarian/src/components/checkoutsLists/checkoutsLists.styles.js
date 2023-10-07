import { css } from 'emotion';
import { Colors } from '@blueprintjs/core';

export const listBlockStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  overflow: auto;
  width: 100%;
  margin-bottom: 0.35em;
  max-height: 23rem;
`;

export const listBlockContentStyles = css`
  flex: 1;
  display: flex;
  overflow: auto;
  background-color: ${Colors.LIGHT_GRAY3};
  align-items: center;
  padding: 0.25em;
  flex-direction: column;
  text-align: center;
  width: 100%;
  min-height: 5em;
`;

export const headerStyles = css`
  margin-bottom: 0.15em;
`;
