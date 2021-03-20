export const indexPage = (req, res, next) => {
  res.render("index", { title: "Top 10 Movies" });
};
