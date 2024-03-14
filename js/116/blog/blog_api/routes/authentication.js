const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(async (req, res, next) => {
  req.users = await req.database.collection('users');
  next();
});

router.post('/register', (async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    /*db.users.getIndexes()
    db.users.dropIndex('username_1')
    db.users.createIndex({ username: 1 }, { unique: true })*/

    const result = await req.users.insertOne({ username: req.body.username, password: hash });

    console.log(result);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return next(new Error(`${req.body.username} is already taken. Please try a different name`));
    }

    return next(err);
  }
}));

router.post('/login', async (req, res, next) => {
  try {
    const results = await req.users.findOne({username: req.body.username});

    if (!results) {
      throw new Error('Bad username and/or password');
    }
    console.log(results);

    if (!await bcrypt.compare(req.body.password, results.password)) {
      throw new Error('Bad username and/or password');
    }

    req.session.username = req.body.username;
    res.sendStatus(204);
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
