const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = "autos";




const getOne = async (id) => {
    const idNumerico = Number(id);
    const collection = await Database(COLLECTION);
    
    return await collection.findOne({ id : idNumerico});
};

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const deleteOne = async (id) => {
    const idNumerico = Number(id);
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({ id : idNumerico});
};

const create = async (vehicle) => {
    const collection = await Database(COLLECTION);
    await collection.insertOne(vehicle);
    return vehicle;
};


module.exports.VehiculosService = {
    getAll,
    getOne,
    deleteOne,
    create
};