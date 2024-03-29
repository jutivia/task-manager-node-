const { CustomError } = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({message: err.message});
  }
  return res
    .status(500)
    .json({
      message: "Server Error, please try again",
    });
};
module.exports = errorHandler;
