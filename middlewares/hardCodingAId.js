const hardCodingAId = (req, res, next) => {
  req.user = {
    _id: '6551cda6b3fed233a14d8a7e',
  };

  next();
};

module.exports = {
  hardCodingAId,
};
