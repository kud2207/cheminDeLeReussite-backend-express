import { Request, Response } from 'express';
import { sendResponse } from '../utils/responce-format';
import { MESSAGE_CODE } from '../utils/message-code';
import postStageModel from '../models/user-post-stage-model';

// Créer une offre de stage
const createPostStage = async (req: Request, res: Response) => {
  const {
    title,
    position,
    description,
    skills,
    requiredSkills,
    location,
    internshipPeriod,
    deadline,
    educationLevel,
    requestedByClient,
    status
  } = req.body;

  try {
    // Vérification des champs obligatoires
    if (!title || !position || !description || !location || !internshipPeriod || !deadline || !educationLevel) {
      return sendResponse({
        res,
        success: false,
        status: 422,
        message: MESSAGE_CODE.CHAMP_EMPTY
      });
    }

    const newPost = new postStageModel({
      title,
      position,
      description,
      skills,
      requiredSkills,
      location,
      internshipPeriod,
      deadline,
      educationLevel,
      requestedByClient,
      status
    });

    const savedPost = await newPost.save();

    sendResponse({
      res,
      success: true,
      status: 201,
      message: MESSAGE_CODE.POSTSTAGE_CREATE_SUCCESS,
      data: savedPost
    });
  } catch (error) {
    console.error('Erreur création offre de stage :', (error as Error).message);
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.POSTSTAGE_CREATE_ERROR
    });
  }
};

// Récupérer toutes les offres de stage
const getAllPostStages = async (_req: Request, res: Response) => {
  try {
    const posts = await postStageModel.find();

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.POSTSTAGE_FETCH_SUCCESS,
      data: posts
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.POSTSTAGE_FETCH_ERROR
    });
  }
};

// Récupérer une offre par ID
const getPostStageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await postStageModel.findById(id);
    if (!post) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.POSTSTAGE_NOT_FOUND
      });
    }

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.POSTSTAGE_FETCH_SUCCESS,
      data: post
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.POSTSTAGE_FETCH_ERROR
    });
  }
};

// Mettre à jour une offre
const updatePostStage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedPost = await postStageModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPost) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.POSTSTAGE_NOT_FOUND
      });
    }

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.POSTSTAGE_UPDATE_SUCCESS,
      data: updatedPost
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.POSTSTAGE_UPDATE_ERROR
    });
  }
};

//  Supprimer une offre
const deletePostStage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await postStageModel.findByIdAndDelete(id);

    if (!deleted) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.POSTSTAGE_NOT_FOUND
      });
    }

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.POSTSTAGE_DELETE_SUCCESS
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.POSTSTAGE_DELETE_ERROR
    });
  }
};

export {
  createPostStage,
  getAllPostStages,
  getPostStageById,
  updatePostStage,
  deletePostStage
};
