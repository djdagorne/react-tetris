export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//creating a 2D grid to represent the stage/block info
export const createStage = () => 
  //for each of the the stages height...
  Array.from(Array(STAGE_HEIGHT), ()=> 
    //make a width array, with cells that are clear/0.
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )
