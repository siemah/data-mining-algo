let fs = require('fs');
let readline = require('readline');

// create an interface to read file line by line
let lineReader = readline.createInterface({
    input: fs.createReadStream('bdd.txt')
});
// list of sequence
let sequances = {
    a: 0,
    t: 0,
    c: 0,
    g: 0,
}
/**
 * @var {Number} treshold minimum treshold 
 * @var {Object} itemWithSupportAboveTreeshold list of items With Support Above Treeshold
 */
const treshold = 100;
let itemWithSupportAboveTreeshold = {};
// read file line/line
lineReader.on('line', function (line) {
    // split each line (string) from file to several parts
    let lineSequences = line.split(',');
    // count the support of each item
    for (let itm in sequances) 
        if (lineSequences[2].includes(itm)) 
            sequances[itm] = sequances[itm] + 1;
    
    //console.log('------------')
}).on('close', (d) => {
    // console log
    let { a, t, c, g} = sequances;
    console.log(`a: %f, t: %f, c: %f, g: %f`, a, t, c, g);
    console.log(`_____________`);
    //check the treshold and item
    for (const item in sequances) {
        if (sequances.hasOwnProperty(item)) {
            const element = sequances[item];
            if(element > treshold) {
                itemWithSupportAboveTreeshold[item] = element;
            }
        }
    }
    console.log("item With Support Above Treeshold: ", Object.keys(itemWithSupportAboveTreeshold));
    // calcul a cartesian product "produit cartesien"
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