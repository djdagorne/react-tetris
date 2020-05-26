import styled from 'styled-components';
import bgImage from '../../img/bg.jpg';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(55, 55, 55, 0.15), /* tinted so play area pops a bit */
      rgba(55, 55, 55, 0.25)
    ),
    url(${bgImage}) #000;
  background-size: 240px;
  overflow: hidden;
  align-items: center;
`

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 520px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 0 0 20px;
  }
`
