import React from 'react';
import Cell from './Cell'
import { StyledStage } from './styles/StyledStage'

const Stage = ({ stage }) => (
  <StyledStage
    width={stage[0].length}
    height={stage.length}>
    {/* in the first render we have map through the rows, putting in cells with its original value of 0 */}
    {stage.map(row => 
      row.map((cell, x)=> 
        <Cell key={x} type={cell[0]} />
        )
    )}
  </StyledStage>
);

export default Stage;