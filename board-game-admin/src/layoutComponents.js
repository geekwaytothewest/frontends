import colorPalette from './colorPalette';
import styled from '@emotion/styled';
import { Button, H6, InputGroup } from '@blueprintjs/core';

export const ColumnPage = styled.div`
  background-color: ${colorPalette.GRAY4};
  border: 1px solid ${colorPalette.GRAY1};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageContent = styled.div``;

export const RowPage = styled(ColumnPage)`
  @media only screen and (min-width: 601px) {
    flex-direction: row;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const PageHeader = styled.div`
  background-color: ${colorPalette.DARK_GRAY3};
  color: ${colorPalette.WHITE};
  padding: 0.25rem 0;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 6rem;
    justify-content: flex-start;
  }
`;

export const PageSubheader = styled(PageHeader)`
  background-color: ${colorPalette.DARK_GRAY5};
`;

export const PageHeaderSection = styled.div`
  display: flex;
  flex: 1;
`;

export const PageHeaderText = styled.span`
  margin-left: 1em;
  display: flex;
  align-items: center;
`;

export const PageHeaderSearch = styled(InputGroup)`
  margin-left: 1em;
  @media only screen and (max-width: 600px) {
    min-width: 13rem;
  }
`;

export const PageHeaderTitle = styled(H6)`
  flex: 1;
  display: flex;
  height: 2em;
  justify-content: center;
  align-items: center;
  margin: 0 0 2px 0;
  color: ${colorPalette.WHITE};
`;

export const PageHeaderButtonSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 600px) {
    justify-content: space-around;
    margin-top: 0.25em;
  }
`;

export const PageHeaderButton = styled(Button)`
  margin-right: 1em;
`;
