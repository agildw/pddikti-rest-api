import express from "express";
import { getData } from "../controller/pddikti.controller";
const router = express.Router();

router.get("/", getData);

export default router;
