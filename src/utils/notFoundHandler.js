const notFoundHandler = (_req, res) => {
  res.status(404).send('Requested endpoint does not exist');
};

export default notFoundHandler;
