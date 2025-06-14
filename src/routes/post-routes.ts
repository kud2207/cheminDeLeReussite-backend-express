import express from 'express';
import {
  createPostStage,
  getAllPostStages,
  getPostStageById,
  updatePostStage,
  deletePostStage
} from '../controllers/super-user-stage-controller';

const postStageRoutes = express.Router();

// (API Base): http://localhost:3001/poststage

// Créer une offre de stage
postStageRoutes.post('/create', createPostStage);

// Obtenir toutes les offres de stage
postStageRoutes.get('/', getAllPostStages);

//  Obtenir une offre par ID
postStageRoutes.get('/:id', getPostStageById);

//  Mettre à jour une offre
postStageRoutes.put('/update/:id', updatePostStage);

//  Supprimer une offre
postStageRoutes.delete('/delete/:id', deletePostStage);

export {
  postStageRoutes
};
