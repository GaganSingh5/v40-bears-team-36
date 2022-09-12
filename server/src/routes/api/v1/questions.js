import mongoose from "mongoose";
import { Router } from "express";
import { getQuestions } from "../../../controllers/Question.js";


export const router = Router();

router.get("/api/v1/questions/:category", getQuestions)