const Unit = require('./unit');

function Doctor() {
    Unit.call(this);
    this._power = 10;
    
}

module.exports = Doctor;
