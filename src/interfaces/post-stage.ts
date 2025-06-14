export interface PostStage {
    _id?: string;
    title: string; // Exemple : "Stage Remote", "Freelance", etc.
    position: string; // Exemple : "Développeur React"
    description: string;
    skills: string[]; // Compétences recommandées
    requiredSkills: {
      name: string;
      mandatory: boolean;
    }[]; 
    location: string; 
    internshipPeriod: string; // Durée du stage
    deadline: Date; // Date limite de candidature
    educationLevel: string;
    requestedByClient: boolean; // Si c’est un client qui a demandé cette offre
    status?: 'active' | 'expired' | 'closed'; 
    createdAt?: Date;
    updatedAt?: Date;
  }
  