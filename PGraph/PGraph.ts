
import PNode from './PNode';

const PUNCT = ['.', ',', '?', '!', '(', ')'];

export default class PGraph{

  nodes: Map<string, PNode>;

  constructor(text:string){
    this.nodes = new Map<string, PNode>();
    if(text && text.trim().length){
      this.addText(text);
    }
  }

  addText(str: string){
    //split first on whitespace boundaries and trim
    let syms = str.split(/[ \n]+/g).reduce((acc,curr)=>{
      acc.push(...PGraph.getSymbol(curr));
      return acc;
    }, []);
    for(var i = 0; i < syms.length; ++i){
      let currWord = syms[i];
      let nextWord = syms[i+1];
      if(!this.nodes.has(currWord)){
        this.nodes.set(currWord, new PNode(currWord));
      }
      this.nodes.get(currWord).add(nextWord);
    }
  }

  getNode(sym: string):PNode{
    //Find the symbol and get a set of possibilities
    if(this.nodes.has(sym)){
      return this.nodes.get(sym);
    }
  }

  //Get a random sequence of length n
  roll(n:number, start:string):string[]{
    let result = [];
    let node = this.getNode(start);
    while(node && n--){
      result.push(node.key);
      node = this.getNode(node.roll());
    }
    return result;
  }

  static getSentence(syms: string[]):string{
    return syms.reduce((acc,curr)=>{
      if(PUNCT.indexOf(curr) !== -1){
        acc.push(curr+' ');
      }else{
        acc.push(' '+curr);
      }
      return acc;
    }, []).join('');
  }

  // Parses words and returns a list of symbols,
  //  EG: 'poop.' will return ['poop', '.']
  static getSymbol(word: string):string[]{
    let results: string[] = [];
    if(word.length < 2) return [word];
    let splitWord = word.split('');
    let firstChar = splitWord.shift();
    if(PUNCT.indexOf(firstChar) !== -1){
      results.push(firstChar);
    }else{
      splitWord.unshift(firstChar);
    }
    if(splitWord.length < 2 ){
      results.push(splitWord.join());
      return results;
    }
    let lastChar = splitWord.pop();
    if(PUNCT.indexOf(lastChar) !== -1){
      results.push(lastChar);
    }else{
      splitWord.push(lastChar);
    }
    return [splitWord.join(''), ...results];
  }
}