const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //suprime les espace de trop entre les  mots
    },
    secondName: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        //unique: false,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email invalide']
    },
    phone: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Élève', 'Étudiant', 'Demandeur d\'emploi', 'Autre'],
        required: true
    },
    educationLevel: {
        type: String,
        required: true
    },
    interests: {
        type: String,
    },
    cv: {
        type: String, // URL ou nom du fichier CV
        default: null
    },
    profilePhoto: {
        type: String, // URL ou nom du fichier image
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


export default mongoose.model('Student', studentSchema);

 