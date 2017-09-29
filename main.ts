
import * as fs from 'fs';

import PGraph from './PGraph/PGraph';

const testStr = fs.readFileSync('./test_totc_c1.txt', 'utf8')
  .split('\n')
  .map(str=>str.trim())
  .filter(str=>str.length)
  .join(' ');

main();

function main(){
  let pGraph = new PGraph(testStr);
  let roll = pGraph.roll(50, 'It');
  console.log(PGraph.getSentence(roll));
} 