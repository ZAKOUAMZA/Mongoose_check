const mongoose = require('mongoose');
const { Schema } = mongoose;

// Définition du schéma pour la collection 'Person'
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Création du modèle 'Person' à partir du schéma défini
const Person = mongoose.model('Person', personSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Person;
