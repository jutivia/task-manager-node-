const notFound = (req, res, next) => {
    res.status(404).send('<h2> Route does not exist</h2>');
}
module.exports = notFound;