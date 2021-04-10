import React, { useState, createContext } from "react";
import Movie from "./Movie";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { About, ErrorNotFound } from "./Pages";
import MovieForm from "./MovieForm";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const MovieContext = createContext();
export default function MovieList() {
  const [movies, setMovies] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined);
  const history = useHistory();

  useEffect(() => {
    if (!movies) {
      fetch("/api/movies", {
        credentials: "same-origin",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          setMovies(
            JSON.parse(data, (key, value) => {
              const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/;
              if (typeof value === "string" && dateFormat.test(value)) {
                return new Date(value);
              }
              return value;
            })
          );
        })
        .catch(console.error);
    }
  });

  if (!movies) {
    return <p>Loading...</p>;
  }
  return (
    <MovieContext.Provider value={{ movies, setMovies, setAuthenticated }}>
      <div className="pull-content-right">
        <Route path="/movies">
          <button
            className="primary"
            onClick={() => {
              movies.sort((a, b) => a.rating - b.rating);
              setMovies(movies.map((m) => m));
            }}
          >
            Sort
          </button>
          <button
            className="primary"
            onClick={() => history.push("/movies/new")}
          >
            Add a new movie
          </button>
        </Route>
      </div>
      <main>
        <Switch>
          <Route exact path="/movies">
            {movies.map((m, i) => {
              return (
                <Movie
                  key={m.id}
                  movie={m}
                  onLike={() => {
                    movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1;

                    setMovies(movies.map((m) => m));
                  }}
                />
              );
            })}
          </Route>
          <Route path="/movies/new">
            <MovieForm />
          </Route>
          <Route path="/movies/:mid/edit">
            <MovieForm />
          </Route>
          <Redirect from="" to="/movies" />
          <Route path="*">
            <ErrorNotFound />
          </Route>
        </Switch>
      </main>
    </MovieContext.Provider>
  );
}
