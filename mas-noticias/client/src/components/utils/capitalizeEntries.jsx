
export default function capitalizeEntries (entrie) {
    
    for (let i=0; i<entrie.length;i++) {
        if(i===0) {
            entrie = entrie[0].toUpperCase() + entrie.slice(1)
        }
        if(entrie[i]=== " ") { 
            let aux2 = entrie.split(" ")
            entrie = aux2[0] + " " + aux2[1][0].toUpperCase() + aux2[1].slice(1)
         }
    }
    return entrie;
}