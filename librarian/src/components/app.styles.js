import { css } from '@emotion/css';
import { Colors } from '@blueprintjs/core';

export const appStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${Colors.GRAY1};
  color: ${Colors.DARK_GRAY1};

  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #toast-container {
    margin-top: 1em;
  }

  em {
    font-style: normal;
    color: ${Colors.GRAY1};
  }

  .bp3-non-ideal-state {
    max-width: 250px;
  }
`;

export const allContentPaneStyles = css`
  display: flex;
  height: 97%;
  width: 98%;
  justify-content: space-between;
  align-items: center;
`;
