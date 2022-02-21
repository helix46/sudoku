export interface StructCell {
  rowIndex: indexType;
  columnIndex: indexType;
  given: boolean;
  digit: digitType;
  candidates: candidateType[];
  focussed: boolean;
  error: boolean;
}

// export type columnType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// export type rowType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';
export type candidateType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type digitType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '';
export type indexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const dimension = 9;

export interface StructBlock {
  startRowIndex: indexType;
  startColumnIndex: indexType;
  cells: StructCell[];
}
