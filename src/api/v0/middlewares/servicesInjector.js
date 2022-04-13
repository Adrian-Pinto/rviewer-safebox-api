export default (services) => (req, res, next) => {
  Object.defineProperty(req, 'services', {
    value: services,
    writable: false,
  });
  next();
};
