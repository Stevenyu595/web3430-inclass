import React, { useContext, useState } from "react";
import { MovieContext } from "./MovieList";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
toast.configure();

export function VHelp({ message }) {
  return <p className="help">{message}</p>;
}

const validationSchema = yup.object({
  year: yup.number().required().min(1900).max(new Date().getFullYear()),
  title: yup.string().required(),
  poster: yup.string().url().required(),
  plot: yup.string().required(),
  releaseDate: yup.date().required(),
  rated: yup.string().required(),
  genre: yup.string().required(),
  rating: yup.number().required().min(0).max(10),
  votes: yup.number().required().min(0),
  imdbID: yup.number().required(),
});

export default function MovieForm() {
  let { movies, setMovies, authenticated, setAuthenticated } = useContext(
    MovieContext
  );
  let { mid } = useParams();

  if (!authenticated) {
    document.location = "/signin";
    return <></>;
  }

  let movie = mid ? movies.find((m) => m.id == mid) : {};
  let is_new = mid === undefined;
  let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik(
    {
      initialValues: is_new
        ? {
            year: new Date().getFullYear(),
            title: "",
            poster: "",
            plot: "",
            releaseDate: "",
            rated: "",
            genre: "",
            rating: "",
            votes: "",
            imdbID: "",
          }
        : { ...movie },
      validationSchema,
      onSubmit(values) {
        fetch(`/api/movies${is_new ? "" : "/" + movie.id}`, {
          method: is_new ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(values),
        })
          .then(() => {
            toast("Successfully submitted", {
              onClose: () => {
                document.location = "/movies";
              },
            });
          })
          .catch((err) => {
            toast("Failed to submit", {
              onClose: () => {
                document.location = "/movies";
              },
            });
          });
      },
    }
  );

  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adding/Editing a movie</h1>
      <div className="field">
        <label htmlFor="year">Year</label>
        <div className="control">
          <input
            type="text"
            name="year"
            value={values.year}
            onChange={handleChange}
          />
          <VHelp message={errors.year} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="title">Title</label>
        <div className="control">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <VHelp message={errors.title} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="releaseDate">ReleaseDate</label>
        <div className="control">
          <DatePicker
            name="releaseDate"
            selected={values.releaseDate}
            onChange={(date) => setFieldValue("releaseDate", date)}
          />
          <VHelp message={errors.releaseDate} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="poster">Poster</label>
        <div className="control">
          <input
            type="text"
            name="poster"
            value={values.poster}
            onChange={handleChange}
          />
          <VHelp message={errors.poster} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="plot">Plot</label>
        <div className="control">
          <textarea
            type="text"
            name="plot"
            value={values.plot}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.plot} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="rated">Rated</label>
        <div className="control">
          <textarea
            type="text"
            name="rated"
            value={values.rated}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.rated} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="genre">Genre</label>
        <div className="control">
          <textarea
            type="text"
            name="genre"
            value={values.genre}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.genre} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="rating">Rating</label>
        <div className="control">
          <textarea
            type="text"
            name="rating"
            value={values.rating}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.rating} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="votes">Votes</label>
        <div className="control">
          <textarea
            type="text"
            name="votes"
            value={values.votes}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.votes} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="imdbID">imdbID</label>
        <div className="control">
          <textarea
            type="text"
            name="imdbID"
            value={values.imdbID}
            onChange={handleChange}
          ></textarea>
          <VHelp message={errors.imdbID} />
        </div>
      </div>

      <div className="field">
        <label></label>
        <div className="control">
          <button className="primary" type="submit">
            Submit
          </button>
          <button className="primary" onClick={() => history.push("/movies")}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
