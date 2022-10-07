/*
cypherpost.io
Developed @ Stackmate India
*/
// ------------------ '(◣ ◢)' ---------------------
import express from "express";
import {
    handleGetLandingPage,handleGetPrimerPage,handleGetCypherpostPage
} from "./dto";


// // ------------------ '(◣ ◢' ---------------------
export const router = express.Router();

router.get("/", handleGetLandingPage);
router.get("/primer", handleGetPrimerPage);
router.get("/cypherpost", handleGetCypherpostPage);

// // ------------------ '(◣ ◢)' ---------------------