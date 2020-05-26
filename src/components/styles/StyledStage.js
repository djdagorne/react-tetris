import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(300px / ${props => props.width + 1})
  );
  grid-template-columns: repeat(
    ${props => props.width},
    calc(520px / ${props => props.height + 1})
  );
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  height: 100%;
  max-width: 320px;
  max-height: 520px;
  background: #222;
`