import { Movie } from "../models/movie";

export const allMoviesAPI = (req, res, next) => {
  Movie.find()
    .select("-reviews")
    .exec((err, movies) => {
      if (err) {
        res.json({ success: false, message: "Query failed" });
        res.end();
      } else {
        res.write(JSON.stringify(movies));
        res.end();
      }
    });
};
