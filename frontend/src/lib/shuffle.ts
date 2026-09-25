export const shuffleArray = <T>(arr:T[]): T[]=>{
    const items = [...arr]
    for (let i = items.length-1 ; i>0 ; i--){
        const rand = Math.random();
        const j:number = Math.floor( (i+1) * rand);
        [ items[i] , items[j] ] = [ items[j], items[i] ];
    }
    return items
}   