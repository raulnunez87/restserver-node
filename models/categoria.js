const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

CategoriaSchema.method('toJSON', function() {
    const { __v, _id, estado, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Categoria', CategoriaSchema );