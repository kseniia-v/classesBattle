const Unit = require('./unit');

function Soldier() {
    Unit.call(this);
    this._power = 15;
}

module.exports = Soldier;
