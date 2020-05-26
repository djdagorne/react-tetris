import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y: 0},
    tetromino: TETROMINOS[0].shape, //first declaration cant use the randTetro func or it can call the blank shape of 0
    collided: false,    
  });

  //takes the tetromino (as a matrix), and a direction
  const rotate = (matrix, dir) => {
    //basically reversing x and y values, 
    //rows become columns, transposed
    const rotatedMatrix = matrix.map((_, index) => (
      matrix.map(col => col[index])
    ));
    //reverse each row to get a rotated matrix
    //if dir > 0, its clockwise so we flip the row's values, otherwise its cc-wise and we can just flip the columns
    if(dir > 0){
      return rotatedMatrix.map(row => row.reverse());
    }
    return rotatedMatrix.reverse();
  }

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x; 
    let offset = 1;
    
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      //here we make sure collison preevents rotations from overlapping tetrominos
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1))//creates the back/forth movement before rotating
      if(offset > clonedPlayer.tetromino[0].length){//if rotation will cause a larger offset than the objects size...
        rotate(clonedPlayer.tetromino, -dir)
        clonedPlayer.pos.x = pos; //return to default position, no changes are applied to the matrix
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided,
    }))
  }

  /* we need to pass the useCallback hook to prevent an infinite loop */
  const resetPlayer = useCallback(() => {
    /* these positions set the tetromino in the top center */
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    })
  }, [])
  /* when we import this into the tetris component, we need to get the player info into that component */
  return [player, updatePlayerPos, resetPlayer, playerRotate];
}