function Unit(name){
  this.MAXHEALTH = 100;
  this._name = name;
  this._health = this.MAXHEALTH;
}

Unit.prototype._level = 1;
Unit.prototype._xp = 0;
Unit.prototype._power = 15;

Unit.prototype.getName = function() {
  return this._name;
}

Unit.prototype.getLevel = function() {
  return this._level;
}

Unit.prototype.isAlive = function() {
  return this._health > 0;
}

Unit.prototype.addHealth = function(a) {
  return this._health = this._health + a < this.MAXHEALTH ? this._health + a : this.MAXHEALTH;
}

Unit.prototype.takeDamage = function(a) {
  this._health = this._health - a * (this._resistance ? this._resistance : 1);
  this._earnExperience(500);
}

Unit.prototype._earnExperience = function(a) {
  this._xp += this._level > 1 ? (a - a * this._level * 0.1) : a;
  this._levelUp();
}

Unit.prototype._levelUp = function() {
  if (this._xp % 1000 === 0){
    this._level += this._level + 1;
    console.log(this._name + ' has improved his level up to ' + this._level);
  }
}

Unit.prototype.action = function(units, shots){
  var stdPower = this._power * units * (shots ? shots : 1);
  var result = this._level > 1 ? (stdPower + stdPower * this._level * 0.01) : stdPower;
  this._earnExperience(250);
  return result;
}

Unit.prototype.affect = function(whom, units, shots){
  var effect = this.action(units, shots);
  if(this instanceof Doctor){
    this.addHealth.call(whom,effect);
  }else{
    this.takeDamage.call(whom,effect);
  }
  if(this.isAlive.call(whom)){
    console.log(this.getName.call(whom) + ' is still ready to fight!');
  }else{
    console.log('Battle is over for ' + this.getName.call(whom));
  }
}

module.exports = Unit;
