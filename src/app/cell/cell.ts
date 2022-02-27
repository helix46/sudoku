import { digitType, indexType } from '../definitions';
import { getColumnOfCells, getRowOfCells } from '../utilities.service';
import { Block } from '../block';

export class Cell {
  public readonly rowIndex!: indexType;
  public readonly columnIndex!: indexType;
  public given = false;
  private digitPrivate: digitType = '';
  private candidatesPrivate: digitType[] = [];
  public readonly blockIndex!: indexType;

  set digit(digit: digitType) {
    this.digitPrivate = digit;
    this.candidates = [];
    this.removeSeenCandidates();
  }
  get digit(): digitType {
    return this.digitPrivate;
  }
  set candidates(candidates: digitType[]) {
    this.candidatesPrivate = candidates;
  }
  get candidates(): digitType[] {
    return this.candidatesPrivate;
  }

  public focussed = false;
  public error = false;

  removeSeenCandidates = () => {
    if (this.rowIndex === 4 && this.columnIndex === 8) {
      console.log('');
    }
    const row: Cell[] = getRowOfCells(this.rowIndex);
    row.forEach((cell) => {
      cell.removeCandidate(this.digit);
    });
    const column = getColumnOfCells(this.columnIndex);
    column.forEach((cell) => {
      cell.removeCandidate(this.digit);
    });
    const block = new Block(this.blockIndex);
    block.cells.forEach((cell) => {
      cell.removeCandidate(this.digit);
    });
  };

  public candidatesContainDigit = (digit: digitType): boolean => {
    let found = false;
    this.candidates.forEach((candidate) => {
      if (candidate === digit) {
        found = true;
      }
    });
    return found;
  };

  checkForSingleCandidate = (): boolean => {
    const previousDigit = this.digit;
    if (this.candidates.length === 1) {
      this.digit = this.candidates[0];
      this.candidates = [];
      this.removeSeenCandidates();
    }
    return this.digit !== previousDigit;
  };

  getBlockIndexFromCell = (): indexType => {
    if (this.rowIndex < 3) {
      if (this.columnIndex < 3) {
        return 0;
      }
      if (this.columnIndex < 6) {
        return 1;
      }
      return 2;
    }
    if (this.rowIndex < 6) {
      if (this.columnIndex < 3) {
        return 3;
      }
      if (this.columnIndex < 6) {
        return 4;
      }
      return 5;
    }
    if (this.columnIndex < 3) {
      return 6;
    }
    if (this.columnIndex < 6) {
      return 7;
    }
    return 8;
  };

  public removeCandidate = (candidate: digitType): boolean => {
    let changeMade = false;
    const temp: digitType[] = [];
    this.candidates.forEach((c) => {
      if (c !== candidate) {
        temp.push(c);
      } else {
        changeMade = true;
      }
      this.candidates = temp;
    });
    return changeMade;
  };

  constructor(rowIndex: indexType, columnIndex: indexType) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.blockIndex = this.getBlockIndexFromCell();
  }
}
