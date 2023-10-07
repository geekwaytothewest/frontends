import React from 'react';
import styled from '@emotion/styled';
import CopyTag from './CopyTag';

const CopyListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const CopyList = ({ copies }) => (
  <CopyListContainer>
    {copies.map(copy => (
      <CopyTag key={`${copy.ID}${copy.Game.Name}`} copy={copy} />
    ))}
  </CopyListContainer>
);

export default CopyList;
