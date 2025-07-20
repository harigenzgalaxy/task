const auth = (req, res, next) => {
  console.log(`[${req.method}] ${req.url} — logging`);
  next();
};

module.exports = auth;