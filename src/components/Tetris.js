import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';

//Styled components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

//custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  //setting up hooks for new game
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  //setting up player/stage values, using our custom hooks
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

  const movePlayer = dir => {
    //Takes care of left/right movement
    //if we aren't colliding, update pos
    if(!checkCollision(player, stage, { x: dir, y: 0})){
      updatePlayerPos({x: dir, y: 0});
    }
  }

  const startGame = () => {
    //Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false); //to clean the value from last gameover state
    setRows(0);
    setLevel(0);
    setScore(0);
  }

  const drop = () => {
    //increase level after 10 rowsCleared
    if(rows > (level + 1) * 10){
      setLevel(prev => prev + 1);
      setDropTime(1000/ (level + 1) + 300);
    }

    if(!checkCollision(player, stage, { x: 0, y: 1})){
      updatePlayerPos({x: 0, y: 1, collided: false})
    } else {
      if(player.pos.y < 1) {
        console.log('Game Over!');
        setGameOver(true);
        setDropTime(null);
      }
      //if we are collided as we drop, remove x and y movement values, and set collided to true
      updatePlayerPos({x: 0, y: 0, collided: true})
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const keyUp = ({keyCode}) => {
    if(!gameOver){
      if(keyCode === 40){
        setDropTime(1000/ (level + 1) + 300);
      }
    }
  }

  const move = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 37) {/* 37 is left direction key */
        movePlayer(-1);
      } else if(keyCode === 39) {/* 39 is right direction key */
        movePlayer(1);
      } else if(keyCode === 40) {/* 40 is down direction key */
        dropPlayer();
      } else if(keyCode === 38) { /* 38 is up direction key, so we only have clockwise rotation classic tetris style */
        playerRotate(stage, 1);
      }
    }
  }

  useInterval(
    ()=>{drop()},
    dropTime
  );

  return (
    /* Wrapper made with 100vw/vh so it can catch all the key inputs without having focus on the game grid */
    <StyledTetrisWrapper 
      role="button" 
      tabIndex="0" 
      onKeyDown={e => move(e)} 
      onKeyUp={keyUp}
    >
      <StyledTetris>
      <Stage stage={stage}/>
      <aside>
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
          </div>
        )}
        <StartButton callback={startGame}/>
      </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
};

export default Tetris;