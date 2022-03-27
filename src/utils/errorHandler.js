const errorHandler = (err, _req, res, _next) => {
  res.status(err?.status || 500).send(err?.message || 'Unexpected API error');
};

export default errorHandler;
