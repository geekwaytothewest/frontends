import { css } from 'emotion';
import { Colors } from '@blueprintjs/core';

export const legendStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0;

  dd {
    margin: 0 0.5em 0 4em;
  }

  dd:first-of-type {
    margin-left: 0;
  }

  dt {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .success {
    background-color: ${Colors.GREEN3};
  }

  .warning {
    background-color: ${Colors.ORANGE3};
  }

  .danger {
    background-color: ${Colors.RED3};
  }
`;
