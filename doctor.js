const Unit = require('./unit');

function Doctor() {
    Unit.apply(this, arguments);
    this._power = 10;
}

Doctor.prototype.__proto__ = Unit.prototype;

module.exports = Doctor;
