export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//creating a 2D grid to represent the stage/block info
export const createStage = () => (
  //for each of the the stages height...
  Array.from(Array(STAGE_HEIGHT), ()=> 
    //make a width array, with cells that are clear/0.
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )
);

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      //were looping through tetromino cells, so were checking if they are 0's or the shape letter
      if(player.tetromino[y][x] !== 0) {
        if( 
          //check if movement is within the game area height, y
          //is the cell we intend to move to has a value, so if this line returns true, we are colliding with something
          !stage[y + player.pos.y + moveY] || 
          //check if movement is within game area width, x
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || 
          //check if cell isn't set to clear, and we aren't colliding with anything
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
}