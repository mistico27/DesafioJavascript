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
 
