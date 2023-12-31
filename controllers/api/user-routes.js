const router = require('express').Router();

const { Users } = require('../../models');

// /api/users endpoint

// sign up new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.loggedIn = true;
    req.session.username = req.body.username;

    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const plainData = dbUserData.get({ plain: true });

    req.session.loggedIn = true;
    req.session.username = plainData.username;

    req.session.save(() => {
      res.status(200).json({ user: plainData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
