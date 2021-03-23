const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }

});

ProductoSchema.method('toJSON', function() {
    const { __v, _id, estado, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Producto', ProductoSchema );