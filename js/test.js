// crea un nuevo objeto `Date`
var today = new Date(); 
// `getDate()` devuelve el día del mes (del 1 al 31)
var day = today.getDate();
// `getMonth()` devuelve el mes (de 0 a 11)
var month = today.getMonth() + 1;
// `getFullYear()` devuelve el año completo
var year = today.getFullYear();
// muestra la fecha de hoy en formato `MM/DD/YYYY`

let fullDate = `${month}/${day}/${year}`

console.log(fullDate);
 
function isBigEnough(value) {
    return value >= 10;
  }
  
  const filtered = console.log([12, 5, 8, 130, 44].filter(isBigEnough));
  // filtered is [12, 130, 44]



  var creatures = [
    {name: "Shark", habitat: "Ocean"},
    {name: "Whale", habitat: "Ocean"},
    {name: "Lion", habitat: "Savanna"},
    {name: "Monkey", habitat: "Jungle"}
  ];
  var aquaticCreatures =  creatures.filter(function(creature) {
    return creature.habitat == "Ocean";
  });