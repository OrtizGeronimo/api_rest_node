const { MongoClient } = require('mongodb');

var connection = null;

module.exports.Database = (collection) => 
    new Promise( async (res, rej) => {
        try {
            if(!connection) {
                const client = new MongoClient("mongodb+srv://admin:admin@nodejsapi.egej1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
                connection = await client.connect();
                console.log("Nueva conexión con mongodb");
            }
            console.log("Reutilizando conexión");
            const db = connection.db("vehiculos");
            res(db.collection(collection));
        } catch (error) {
            rej(error);
        }
    });