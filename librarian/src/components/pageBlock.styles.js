import { css } from '@emotion/css';
import { Colors } from '@blueprintjs/core';

export const blockStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4em;
  height: 100%;
  background-color: ${Colors.LIGHT_GRAY5};
  border: 1px solid ${Colors.GRAY3};
  flex: 0.2 1 auto;
  width: 30%;
`;

export const squatStyles = css`
  min-height: 150px;
  max-height: 18rem;
  width: 25%;
`;
