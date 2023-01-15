const userData = (req, res) => {
  res.json({
    ...req.user,
  });
};

module.exports = { userData };
