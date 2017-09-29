# Running the script
Perform an `npm install` and verify that `tsc` is installed.

Compile once with `tsc main.ts` or watch the directory `tsc --watch`.

Make sure the run script is executable: `chmod a+x ./run.sh`

Execute the run script:
`./run.sh`



## Explanation

In `main.ts` the `PGraph` will be initialized with a string read from a file. It will default to the provided tewxt file `text_totc_c1.txt`, which is the first chapter of *A Tale of Two Cities*.

The roll function takes a length and a seed word as inputs

```typescript
pGraph.roll(length: number, seedWord: string): string
```

For instance, given *A Tale of Two Cities* and performing a roll with the inputs `15, 'It'` can produce the following sentence:

```
  It was the winter of monks which passed within his hands cut off diamond crosses
```

### Caveats

Currently the generator does not handle logical punctuation very well. You may get sentences with improperly opened/closed parentheses or braces. 

The generator will produce text so long that there are nodes to pursue. Null nodes are possible, and will cause premature termination of the generation if encountered.