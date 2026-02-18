export const getCurrentTimeInSec = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const getTimeInSec = (date: number): number => {
  return Math.floor(date / 1000);
};
