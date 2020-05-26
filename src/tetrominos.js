export const TETROMINOS = {
  //creating the preset tetrominos
  0: {
    shape: [
      [0]
    ],
    color: '0, 0, 0',
  },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '255,120,189'
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '124,253,28'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O']
    ],
    color: '255,73,26'
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '255,243,24'
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0]
    ],
    color: '23,236,97'
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0],
    ],
    color: '98,190,234'
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0]
    ],
    color: '255,146,27'
  }
}

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  //returns a random letter that represents a tetromino and its value
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino]
}