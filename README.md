In each bundle of 3 rows or columns, check if number X is in there twice
If so, check the square without the number to see if X can be deduced.

Deduce possible small numbers for each cell
Check each number in each row/col/square to see if there is only one possible place for the number

I there are identical pairs of possibles in each row/col/square eliminate these from possibles in other cells

Naked singles DONE
Naked pairs DONE
Naked triples: in a house, make a list of digit / index combinations
Naked quads

I implemented something like this.
I generated a set of cells for each candidate with each set containing just the cells 
containing that candidate from the unit (row/col/square).
Then I enumerated all combinations of length 1 up to N-1 (N being the number
of unsolved cells in the unit) of candidates present in the unit and checked whether 
the union of all the candidates' cell set (precalculated previously, as described) 
contained the same number of cells as the number of candidates in the combination. 
This method finds both hidden and naked sets (singles, pairs, triples, quads etc) 

https://softwareengineering.stackexchange.com/questions/270930/sudoku-hidden-sets-algorithm 

Naked or hidden N candidates in a house
Get a set S of candidates that appear in N or fewer cells of the house
If the size of S >= N, try all combinations of length N of the candidates in S
If the combination only appears in N cells then remove other candidates in these cells
