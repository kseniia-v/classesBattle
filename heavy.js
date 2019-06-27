const Soldier = require('./soldier');

function Heavy() {
    Soldier.apply(this,arguments);
    this._resistance = 0.2;
}

Heavy.prototype.__proto__ = Soldier.prototype;

module.exports = Heavy;
