import { dimension, indexType, digitType } from './definitions';
import { Cell } from './cell/cell';

export const allCells: Cell[][] = [];

export const getColumnOfCells = (columnIndex: indexType): Cell[] => {
  const ColumnOfCells: Cell[] = [];
  getIndexArray().forEach((rowIndex) => {
    ColumnOfCells.push(allCells[rowIndex][columnIndex]);
  });
  return ColumnOfCells;
};

export const getRowOfCells = (rowIndex: indexType): Cell[] => {
  const rowOfCells: Cell[] = [];
  getIndexArray().forEach((columnIndex) => {
    rowOfCells.push(allCells[rowIndex][columnIndex]);
  });
  return rowOfCells;
};

export const getIndexArray = (): indexType[] => {
  const array: indexType[] = [];
  for (let i = 0; i < dimension; i++) {
    array.push(i as indexType);
  }
  return array;
};

export const getDigitArray = (): digitType[] => {
  const array: digitType[] = [];
  for (let i = 1; i <= dimension; i++) {
    array.push(i.toString() as digitType);
  }
  return array;
};

export const addNumberstoUniqueArray = <T>(
  array: T[],
  numbersToAdd: T[]
): boolean => {
  let changeMade = false;
  numbersToAdd.forEach((num) => {
    const filteredArray = array.filter((arrayNum) => {
      return arrayNum === num;
    });
    // if number to add does not exist in array
    if (filteredArray.length === 0) {
      array.push(num);
      changeMade = true;
    }
  });
  array.sort();
  return changeMade;
};

// assumes that each array is sorted
export const arrayEquals = <T>(pair: T[], candidates: T[]): boolean => {
  if (pair.length !== candidates.length) {
    return false;
  }

  let equals = true;
  pair.forEach((value, index) => {
    if (value !== candidates[index]) {
      equals = false;
    }
  });
  return equals;
};

export const digitFoundinHouse = (house: Cell[], digit: digitType): boolean => {
  let found = false;
  house.forEach((cell) => {
    if (cell.digit === digit) {
      found = true;
    }
  });
  return found;
};

export const digitFoundinArray = (
  digit: digitType,
  digits: digitType[]
): boolean => {
  let found = false;
  digits.forEach((d) => {
    if (d === digit) {
      found = true;
    }
  });
  return found;
};
