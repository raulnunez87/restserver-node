

const { Schema, model } = require('mongoose');


const RolSchema = Schema({

    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

});

RolSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Rol', RolSchema );