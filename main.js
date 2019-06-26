const Unit = require('./unit');
const Doctor = require('./doctor');
const Soldier = require('./soldier');
const Heavy = require('./heavy');

var doctor1 = new Unit('Dr Watson');
var doctor2 = new Doctor('Dr Watson');
var soldier = new Soldier('Sherlock Holmes');
var heavy = new Heavy('Baskervilles Hound');


//completely failed to pass context from unit class to child classes
//console.log(doctor1.getName());
console.log(doctor2.getName());

/*
soldier.affect(heavy,10);
heavy.affect(soldier,10,5);
heavy.affect(doctor,10,5);
*/
