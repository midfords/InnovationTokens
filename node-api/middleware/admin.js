module.exports = function(req, res, next) {
  if (!req.user.roles.includes("manager"))
    return res.status(403).send("Access denied.");

  next;
};
