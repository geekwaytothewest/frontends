import styled from '@emotion/styled';
import colorPalette from '../colorPalette';
import { scrollbarStyles } from '../styles';
import { Card, Button } from '@blueprintjs/core';

export const AttendeeCard = styled(Card)`
  background-color: ${colorPalette.LIGHT_GRAY1};
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  margin: 0 1em 1em 0;
  width: 16em;
  height: 5em;
`;

export const AttendeeCardRight = styled.div`
  flex: 4;
  display: flex;
  margin-left: 1em;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardBoldText = styled.h5`
  margin: 0;
`;
export const CardText = styled.p`
  margin: 0;
`;

export const BadgeNumberText = styled(CardBoldText)`
  width: 100%;
  text-align: center;
`;

export const AttendeePageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  padding: 1em;
  overflow-y: auto;
  ${scrollbarStyles};
`;

export const EditAttendeeButton = styled(Button)`
  position: relative;
`;
