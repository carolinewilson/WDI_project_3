const User = require('../models/user');
const Location = require('../models/location');

// INDEX
function usersIndex(req, res) {
  User.find((err, users) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(users);
  });
}
// CREATE
function usersCreate(req, res) {
  User.create(req.body, (err, user) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(user);
  });
}
// SHOW
function usersShow(req, res) {
  User.findById(req.params.id)
    .populate({
      path: 'trips.location',
      model: Location
    })
    .exec((err, user) => {
      if(err) return res.status(500).json({ error: err });
      if(!user) return res.status(404).json({ error: 'Not found' });
      return res.json(user);
    });
}
// UPDATE
function usersUpdate(req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) return res.status(500).json({ error: err });
    if(!user) return res.status(404).json({ error: 'Not found' });
    for(const key in req.body) {
      user[key] = req.body[key];
    }
    user.save((err, user) => {
      if(err) return res.status(400).json({ error: err });
      res.json(user);
    });
  });
}
// DELETE
function usersDelete(req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) return res.status(500).json({ error: err });
    if(!user) return res.status(404).json({ error: 'Not found' });
    user.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}
module.exports = {
  index: usersIndex,
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
