import { css } from '@emotion/core';
import colorPalette from '../colorPalette';
import styled from '@emotion/styled';
import { Button, InputGroup } from '@blueprintjs/core';
import { scrollbarStyles } from '../styles';

export const ListHeading = styled.div`
  background-color: ${colorPalette.DARK_GRAY3};
  color: ${colorPalette.WHITE};
  padding: 0.25rem 0;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

export const listItemStyles = css`
  color: ${colorPalette.LIGHT_GRAY5};
  font-weight: bold;
  align-content: center;
  background-color: ${colorPalette.BLUE3};
  width: 100%;
  border-radius: 0;

  :hover {
    background-color: ${colorPalette.BLUE2};
    cursor: pointer;
  }
`;

export const selectedListItemStyles = css`
  ${listItemStyles};
  background-color: ${colorPalette.BLUE1};
  color: ${colorPalette.GREEN5};
`;

const columnStyles = `
  background-color: ${colorPalette.GRAY4};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const collectionListStyles = css`
  ${columnStyles}
  height: 100%;
  border-right: 1px solid ${colorPalette.DARK_GRAY5};
  width: 20%;
  justify-content: flex-start;
  ${scrollbarStyles}
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 25%;
    border-right: 0px;
  }
`;

export const GameSection = styled.div`
  ${columnStyles}
  width: 80%;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 75%;
  }
`;

export const gameListStyles = css`
  ${columnStyles}
  ${scrollbarStyles}
  padding: 0.75em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flext-start;
  align-items: flex-start;
  width: 100%;
`;

export const LoadMoreButton = styled(Button)`
  width: 100%;
  text-align: center;
`;

export const GameTileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const GameTileHeaderAddBtn = styled(Button)`
  position: relative;
  bottom: 0.5em;
  left: 0.7em;
`;

export const HeadingSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GamesHeaderText = styled.h4`
  margin: 0;
`;

export const GamesHeaderSearch = styled(InputGroup)`
  display: inline;
  margin-left: 1em;
  align-self: flex-start;
`;

export const OpenAddGameDialogButton = styled(Button)`
  align-self: flex-end;
  margin-right: 1em;
`;

export const gameTileStyles = css`
  background-color: ${colorPalette.LIGHT_GRAY3};
  font-size: 10px;
  margin: 0 1.5em 3em 1.5em;
  width: 15rem;
  min-height: 11em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin-top: 0;
  }
`;

export const EditCollectionButton = styled(Button)`
  position: relative;
`;