const Soldier = require('./soldier');

function Heavy() {
    Soldier.call(this);
    this._resistance = 0.2;
}

module.exports = Heavy;
