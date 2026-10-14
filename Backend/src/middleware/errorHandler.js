function notFound(req, res) {
  return res.status(404).json({ message: "Route not found." });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must contain valid JSON." });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: "Submitted data is invalid." });
  }

  console.error("Unhandled API error:", error);
  return res.status(500).json({ message: "An unexpected server error occurred." });
}

module.exports = { errorHandler, notFound };
