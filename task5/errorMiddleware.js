export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.kind === "ObjectId") {
    return res.status(400).json({ message: "invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(422)
      .json({ message: "validation failed", errors: err.errors });
  }

  res.status(500).json({ message: "server error" });
}
