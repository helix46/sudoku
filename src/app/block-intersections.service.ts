import { Injectable } from '@angular/core';
import { StructCell } from './app.component';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class BlockIntersectionsService {
  // If a number is only possible in a row/block of a block
  // then it cannot appear elsewhere in the intersecting row/block
  findBlockIntersections = (cells: StructCell[][]): boolean => {
    let changeMade = false;
    this.utilitiesService.getArray().forEach((block) => {
      if (this.findIntersectionsForBlock(block, cells)) {
        changeMade = true;
      }
    });
    return changeMade;
  };

  findIntersectionsForBlock = (
    block: number,
    cells: StructCell[][]
  ): boolean => {
    let changeMade = false;
    const startRow = this.utilitiesService.getBlockStartRow(block);
    const startCol = this.utilitiesService.getBlockStartColumn(block);
    // this.utilitiesService.getArray(1).foreach((num) => {});

    return changeMade;
  };

  constructor(private utilitiesService: UtilitiesService) {}
}
