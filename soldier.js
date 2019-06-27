const Unit = require('./unit');

function Soldier() {
    Unit.apply(this,arguments);
    this._power = 15;
}

Soldier.prototype.__proto__ = Unit.prototype;

module.exports = Soldier;
