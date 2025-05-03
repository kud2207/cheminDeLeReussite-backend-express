import {Response } from "express";

export interface ApiResponce <T = null>{
  res: Response;
  success: boolean;
  status: number;
  message: string;
  data?: T;
};