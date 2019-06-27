function Unit(name){
  this.MAXHEALTH = 100;
  this._name = name;
  this._health = this.MAXHEALTH;
}

Unit.prototype._level = 1;
Unit.prototype._xp = 0;

Unit.prototype.getName = function() {
  return this._name;
}

Unit.prototype.getLevel = function() {
  return this._level;
}

Unit.prototype.getHealth = function() {
  return this._health;
}

Unit.prototype.getXp = function() {
  return this._xp;
}

Unit.prototype.isAlive = function(a) {
  return a * this._health > 0;
}

Unit.prototype.addHealth = function(a) {
  var cured = this._health < this.MAXHEALTH;
  this._health = this._health + a < this.MAXHEALTH ? this._health + a : this.MAXHEALTH;
  return cured;
}

Unit.prototype.takeDamage = function(a) {
  this._health = this._health - a * (this._resistance !== undefined ? this._resistance : 1);
  if(a > 0){
    this._earnExperience(500);
  }
}

Unit.prototype._earnExperience = function(a) {
  this._xp += this._level > 1 ? (a - a * this._level * 0.1) : a;
  this._levelUp();
}

Unit.prototype._levelUp = function() {
  if (this._xp % 1000 === 0){
    this._level = this._level + 1;
    console.log(this._name + ' has improved his level up to ' + this._level);
  }
}

//I thought units - it is a quantity of actions at a time (hits), but it appeared that there is an extra quantity for heavy - shots
//so I decided to use "unit" as a quantity of "objects" finally
//that's why the same unit quantity I've added to define isAlive to track full 'army'
Unit.prototype.action = function(units, shots){
  var stdPower = this._power * units * (shots === undefined ? 1 : shots);
  var result = this._level > 1 ? (stdPower + stdPower * this._level * 0.01) : stdPower;
  this._earnExperience(250);
  return result;
}


module.exports = Unit;
