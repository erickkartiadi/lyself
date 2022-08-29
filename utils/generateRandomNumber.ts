function generateRandomNumber(from: number, to: number): number {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min) + min);
}

export default generateRandomNumber;
