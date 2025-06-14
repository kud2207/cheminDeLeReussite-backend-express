const mongoose = require('mongoose');

const postStageShema = new mongoose.Schema({
    // Titre de l'offre (ex: Stage remote, Freelance, etc.)
    title: {
        type: String,
        required: true,
        trim: true
    },

    // Nom du poste (ex: Développeur React, Dév Mobile...)
    position: {
        type: String,
        required: true,
        trim: true
    },

    // Description du poste
    description: {
        type: String,
        required: true
    },

    // Compétences souhaitées (liste libre)
    skills: {
        type: [String],
        default: []
    },
  
    // Compétences obligatoires (précisées dans un tableau d'objet)
    requiredSkills: {
        type: [
            {
                name: String,
                mandatory: { type: Boolean, default: false }
            }
        ],
        default: []
    },

    // Lieu du stage (ex: en présentiel, en ligne, Yaoundé...)
    location: {
        type: String,
        required: true
    },

    // Période ou durée du stage (ex: 3 mois, 6 mois...)
    internshipPeriod: {
        type: String,
        required: true
    },

    // Date limite pour postuler
    deadline: {
        type: Date,
        required: true
    },

    // Niveau d’étude requis (Licence, Master, Bac+2, etc.)
    educationLevel: {
        type: String,
        required: true
    },

    // Offre demandée par un client ? (true = oui, false = non)
    requestedByClient: {
        type: Boolean,
        default: false
    },

    // Statut de l’offre (active, expirée, etc.)
    status: {
        type: String,
        enum: ['active', 'expired', 'closed'],
        default: 'active' 
    }
}, {
    timestamps: true
});


export default mongoose.model('PostStageShema', postStageShema);
