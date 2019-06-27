const Unit = require('./unit');
const Doctor = require('./doctor');
const Soldier = require('./soldier');
const Heavy = require('./heavy');

var stage = 1;
var maxStage = 5;

var doctor = new Doctor('Dr Watson');
var soldier = new Soldier('Sherlock Holmes');
var heavy = new Heavy('James Moriarty');

var shots = 0;

var units = {
  doctors: 1,
  holmes: 5,
  moriarties: 2
}

function shoot(){
  var result = Math.round(Math.random()*10) - Math.round(Math.random()*10);
  result = result > 0 ? result : 0;
  return result;
}


function affect(who, whom, units, shots){
  var effect = who.action(units, shots);
  if(who instanceof Doctor){
    this.addHealth.call(whom,effect);
  }else{
    who.takeDamage.call(whom,effect);
  }
  if(who.isAlive.call(whom)){
    console.log(who.getName.call(whom) + ' is still ready to fight!');
  }else{
    console.log('Battle is over for ' + who.getName.call(whom));
  }
}

//affect(who,whom,who's quantity,shots for gun owners);

var battle = function(d,s,h){

  //console.log('Now we will see a grandiose battle between nobble ' + soldier.getName() + ' and insidious ' + heavy.getName() + '!');
//  console.log('As far as it is a fantastic battle, there is some magic used: ' + heavy.getName() + ' multiplied himself up to ' + h + '.');
//  console.log('But ' + soldier.getName() + ' is not a dupe and multiplied himself up to ' + s + '.');
//  console.log('Fearless and the the only ' + d + ' ' + doctor.getName() + ' will do his job if needed.');
//  console.log('Scoundrel ' + heavy.getName() + ' attacks first!');

  while(stage <= maxStage && (soldier.isAlive() && heavy.isAlive())){
    console.log(stage);

    shots = shoot();
    console.log(heavy.getName() + ' shoots at ' + soldier.getName() + ' with ' + shots + ' shots.');
    affect(heavy,soldier,h,shots);

    console.log(doctor.getName() + ' cures his friend ' + soldier.getName());
    affect(heavy,soldier,h,shots);






/*  if (stage < maxStage){
    console.log('So we are going to the next stage of battle as fighters are alive.');
  }else {
    console.log('All are too exhausted to continue so battle is finished with the following result: ');
  }*/
    stage++;
  }
};


battle(units.doctors,units.holmes,units.moriarties);
