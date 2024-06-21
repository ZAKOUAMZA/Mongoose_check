require('dotenv').config();  // Charge les variables d'environnement depuis un fichier .env

const mongoose = require('mongoose');  // Importe le module Mongoose pour MongoDB

const Person = require('./models/Person');  // Importe le modèle Person depuis le fichier ./models/Person.js

const uri = process.env.MONGO_URI;  // Récupère l'URI de connexion à MongoDB depuis les variables d'environnement


/*

mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB Atlas');

    // Create and save a new person
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Pasta']
    });

    person.save();
  })
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));


  */



mongoose.connect(uri)  // Établit la connexion à MongoDB en utilisant l'URI récupéré
  .then(async () => {  // Utilise une promesse pour gérer les opérations une fois la connexion établie

    console.log('Connected to MongoDB Atlas');  // Affiche un message de connexion réussie à MongoDB Atlas

    // Crée plusieurs personnes
    const arrayOfPeople = [
      { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Tacos'] },
      { name: 'Bob', age: 22, favoriteFoods: ['Burgers', 'Salad'] },
      { name: 'Charlie', age: 35, favoriteFoods: ['Pizza', 'Steak'] }
    ];

    try {
      const people = await Person.create(arrayOfPeople);  // Crée des documents Person dans la base de données
      console.log('Personnes créées :', people);

      // Trouve toutes les personnes nommées 'Alice'
      const alices = await Person.find({ name: 'Alice' });
      console.log('Personnes nommées Alice :', alices);

      // Trouve une personne qui aime 'Pizza'
      const pizzaLover = await Person.findOne({ favoriteFoods: 'Pizza' });
      console.log('Personne qui aime la Pizza :', pizzaLover);

      // Trouve une personne par son ID
      const personId = '66759e035b9df5bb1436cee2'; // ID de la personne à rechercher
      const personById = await Person.findById(personId);
      console.log('Personne par ID :', personById);

      // Ajoute "hamburger" à la liste des plats favoris d'une personne
      personById.favoriteFoods.push('hamburger');
      await personById.save();
      console.log('Personne mise à jour :', personById);

      // Met à jour l'âge d'une personne en utilisant findOneAndUpdate
      const updatedPerson = await Person.findOneAndUpdate(
        { name: 'Bob' },
        { age: 20 },
        { new: true }
      );
      console.log('Personne mise à jour :', updatedPerson);

      // Supprime une personne par ID
      const personId2 = '66759e035b9df5bb1436cee4';
      const removedPerson = await Person.findByIdAndDelete(personId2);
      console.log('Personne supprimée :', removedPerson);

      // Supprime toutes les personnes nommées 'Mary'
      const removeResult = await Person.deleteOne({ name: 'Mary' });
      console.log('Résultat de la suppression :', removeResult);

      // Trouve les personnes qui aiment les burritos, triées par nom, limitées à 2 et masque l'âge
      const burritoLovers = await Person.find({ favoriteFoods: 'Burritos' })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec();
      console.log('Amateurs de burritos :', burritoLovers);
    } catch (err) {
      console.error('Erreur lors de l\'exécution de l\'opération :', err);
    }
  })
  .catch((err) => console.error('Erreur de connexion à MongoDB Atlas :', err));