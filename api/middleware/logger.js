const logger = (req,res,next) => {
  const ts = new Date();

  console.log(`-------------------`);
  console.log(`[${ts.toLocaleTimeString()}] Server Request: ${req.method} ${req.url}`);
  next();
}

module.exports = logger;