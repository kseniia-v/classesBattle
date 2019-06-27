const Unit = require('./unit');
const Doctor = require('./doctor');
const Soldier = require('./soldier');
const Heavy = require('./heavy');

var stage = 1;
var maxStage = 5;
var shots = 0;

var doctor = new Doctor('Dr Watson');
var soldier = new Soldier('Sherlock Holmes');
var heavy = new Heavy('James Moriarty');

var units = {
  doctors: 2,
  holmes: 7,
  moriarties: 2
}

function finalState(unit){
  console.log(unit.getName() + ' feels at ' + unit.getHealth() + ' health-points. He achieved the ' + unit.getLevel() + ' level and earned ' + unit.getXp() + ' points of experience');
}

function shoot(){
  var result = Math.floor(Math.random()*4);
  return result;
}

function affect(who, whom, unitsWho, unitsWhom, shots){
  var effect = who.action(unitsWho, shots);

  if(who instanceof Doctor){
    if(whom.addHealth(effect)){
      console.log(whom.getName() + ' cured with : ' + effect + ' points');
    }
  }else{
    console.log(whom.getName() + ' damaged with : ' + effect + ' points');
    whom.takeDamage(effect);
  }
  if(who instanceof Doctor){
    return true;
  }
  if(who.isAlive.call(whom, unitsWhom)){
    if (effect > 0) {console.log(whom.getName() + ' a bit hurts but still is ready to fight!');}
    return true;
  }else{
    console.log('Battle is over for ' + whom.getName() + ' :(');
    console.log(who.getName() + ' won!');
    finalState(who);
    return false;
  }
}



var battle = function(d,s,h){

  console.log('Now we will see a grandiose battle between nobble ' + soldier.getName() + ' and insidious ' + heavy.getName() + '!');
  console.log('As far as it is a fantastic battle, there is some magic used: ' + heavy.getName() + ' multiplied himself up to ' + h + '.');
  console.log('But ' + soldier.getName() + ' is not a dupe and multiplied himself up to ' + s + '.');
  console.log('Fearless and the only ' + d + ' ' + doctor.getName() + ' will do his job if needed.');
  console.log('Scoundrel ' + heavy.getName() + ' attacks first!');

  while(stage <= maxStage && (soldier.isAlive(s) && heavy.isAlive(h))){

    console.log('\n\n ***** ' + stage + ' *****');

    shots = shoot();
    console.log('action 1: ' + heavy.getName() + ' shoots at ' + soldier.getName() + ' with ' + shots + ' shots.');
    if(!affect(heavy,soldier,h,s,shots)){ break; }


    console.log('action 2: ' + doctor.getName() + ' cures his friend ' + soldier.getName());
    affect(doctor,soldier,d,s);

    console.log('action 3: ' + soldier.getName() + ' pays back to his enemy.');
    if(!affect(soldier,heavy,s,h)){ break; }

    console.log('action 4: And one more kick!');
    if(!affect(soldier,heavy,s,h)){ break; }

    console.log('action 5: And again!!!' + soldier.getName() + ' is in a rage!');
    if(!affect(soldier,heavy,s,h)){ break; }

    console.log('action 6: ' + doctor.getName() + ' is too kind... He sweared to heal anyone, even ' + heavy.getName());
    affect(doctor,heavy,d,s);

    console.log('action 7: ' + heavy.getName() + ' doesn\'t cool down and shoots at ' + soldier.getName() + ' with ' + shots + ' shots.');
    if(!affect(heavy,soldier,h,s,shots)){ break; }

    console.log('action 8: ' + doctor.getName() + ' cures his friend ' + soldier.getName());
    affect(doctor,soldier,d,s);

    console.log('action 9: ' + soldier.getName() + ' strikes ' + heavy.getName());
    if(!affect(soldier,heavy,s,h)){ break; }

    console.log('action 10: ' + doctor.getName() + ' is too kind... He sweared to heal anyone, even ' + heavy.getName());
    affect(doctor,heavy,d,s);

    if (stage < maxStage){
      if(soldier.isAlive(s) && heavy.isAlive(h)){
        console.log('So we are going to the next stage of battle as fighters are alive.');
      }
    }else {
      console.log('All are too exhausted to continue so battle is finished with the following results: ');
      finalState(soldier);
      finalState(heavy);
    }
    
    stage++;
  }
};

battle(units.doctors,units.holmes,units.moriarties);

module.exports = battle;
