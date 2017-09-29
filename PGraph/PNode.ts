export default class PNode{
  key: string;
  nodes: Map<string, number>;
  constructor(key: string){
    this.key = key;
    this.nodes = new Map<string, number>();
  }
  add(str: string): number{
    if(!str) return;
    if(this.nodes.has(str)){
      this.nodes.set(str, this.nodes.get(str)+1);
    }else{
      this.nodes.set(str, 1);
    }
    return this.nodes.get(str);
  }
  //Get a possibility based on the probability
  roll():string{
    let keys: string[] = Array.from(this.nodes.keys()).reduce((acc,curr)=>{
      let count = this.nodes.get(curr);
      while(count--){
        acc.push(curr);
      }
      return acc;
    }, []);;
    let randIdx = Math.round(Math.random()* (keys.length-1));
    return keys[randIdx];
  }
}