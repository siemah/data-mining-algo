let fs = require('fs');
let readline = require('readline');

let lineReader = readline.createInterface({
    input: fs.createReadStream('bdd.txt')
});
let sequances = {
    a: 0,
    t: 0,
    c: 0,
    g: 0,
}
const treshold = 100;
let itemWithSupportAboveTreeshold = {};

lineReader.on('line', function (line) {
    //console.log(`${nbr}/ Line from file: ${line}`);

    let lineSequences = line.split(',');
    //console.log(lineSequences[2]);
    for (let itm in sequances) {

        if (lineSequences[2].includes(itm)) {
            sequances[itm] = sequances[itm] + 1;
            //console.log(itm, sequances[itm])
        }
    }
    //console.log('------------')
}).on('close', (d) => {
    console.log(`_____________`);
    let { a, t, c, g} = sequances;
    console.log(`a: %f, t: %f, c: %f, g: %f`, a, t, c, g);
    console.log(`_____________`);
    for (const item in sequances) {
        if (sequances.hasOwnProperty(item)) {
            const element = sequances[item];
            if(element > treshold) {
                itemWithSupportAboveTreeshold[item] = element;
            }
        }
    }
    console.log("item With Support Above Treeshold: ", Object.keys(itemWithSupportAboveTreeshold));
    let prodCart = []; 
    Object.keys(itemWithSupportAboveTreeshold).map( itm1 => 
        Object.keys(itemWithSupportAboveTreeshold).map(itm2 => `${itm1}${itm2}`)
    ).map( arrElem => {
        console.log(arrElem);
        arrElem.forEach(elem => {
            let reverse = elem.split('').reverse().join('');
            if ( !prodCart.includes(elem) && !prodCart.includes(reverse) ) 
                prodCart.push(elem);
        });
    });
    console.log('prod Cart: ', prodCart);
});