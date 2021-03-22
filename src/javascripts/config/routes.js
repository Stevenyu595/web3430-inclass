import express from "express";

import { indexPage } from "../controllers/index";
import { allMoviesAPI } from "../controllers/movies";
let router = express.Router();

export function configureRoutes(app) {
  router.get("/", indexPage);
  router.get("/about", indexPage);
  router.get("/movies*", indexPage);
  router.get("/api/movies", allMoviesAPI);

  app.use("/", router);
}
