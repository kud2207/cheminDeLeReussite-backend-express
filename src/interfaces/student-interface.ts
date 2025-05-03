
export interface Student {
    _id?: string;
    name: string;
    secondName: string;
    email: string;
    phone: string;
    status: 'Élève' | 'Étudiant' | 'Demandeur d\'emploi' | 'Autre';
    educationLevel: string;
    interests: string; 
    cv?: string; 
    profilePhoto?: string;
    isEmailVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  