import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(()=> {
    setRowsCleared(0);//resets the score

    const sweepRows = newStage => (
      newStage.reduce((acc, row) => {
        //if the row has no 0's/'clear' cells
        if(row.findIndex(cell => cell[0] === 0) === -1) { //if it returns -1 it didnt find any
          setRowsCleared(prev => prev + 1); //tally up the score...
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear'])) //if we remove rows, we have to add them to the top of the screen with the correct width of the playing area
          return acc;
        }
        acc.push(row);
        return acc;
      }, [])
    );

    const updateStage = prevStage => {
      //clear stage first
      const newStage = prevStage.map(row => 
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
      //then we draw the tetromino by checking the player object, to see what they are controlling atm
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            //we are on a cell that makes a tetromino
            //this givers coordinates on the stage 
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}` //how we know to clear the tetromino before next rerrender.
            ];
          }
        });
      });
      //check if we collided
      if(player.collided){
        resetPlayer();
        return sweepRows(newStage); //takes the newStage made at the end of updateStage, and sweeps for rows to remove/unshift, returning the cleaned stage
      }

      return newStage;
    };

    setStage(prev => updateStage(prev))
  }, [player, resetPlayer]); //if any of these variables change, the useEffect triggers a rerender. entire player variable is used else it wont rerender if player gets two identical tetrominos in a row when restarting quickly

  return [stage, setStage, rowsCleared];
}