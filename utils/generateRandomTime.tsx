// for placeholder only

import generateRandomNumber from './generateRandomNumber';

function generateRandomTime() {
  const generator = [
    `${generateRandomNumber(1, 59)}m`,
    `${generateRandomNumber(1, 23)}h`,
    `${generateRandomNumber(1, 30)}d`,
  ];

  return `${generator[generateRandomNumber(0, generator.length)]} ago`;
}

export default generateRandomTime;
