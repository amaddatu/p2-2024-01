const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
// i want to make sure that i can see my env vars
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// withAuth will ensure that the user is logged in before access
router.get('/watch', withAuth, (req, res) => {
  res.render('pocketwatch', {
    // fill in later???
    // layout: 'other_main' // layouts/other_main.handlebars
  });
});


// removing withAuth means that this page will not require login
router.get('/turtle-search', (req, res) => {
  res.render('turtle-search', {
    // fill in later???
    layout: 'other_main' // layouts/other_main.handlebars
  });
});

router.get('/turtle/:term', (req, res) => {
  // ANY axios call
  // console.log(axiosDataHere);
  // // simple serialize
  // simplifiedData = JSON.parse(JSON.stringify(complicatedData));
  // console.log(simplifiedData);
  res.render('turtle', {
    term: req.params.term,
    apikey: process.env.GIPHY_APIKEY,

    // data: simplifiedData,
    // fill in later???
    layout: 'other_main' // layouts/other_main.handlebars
  });
});

// removing withAuth means that this page will not require login
router.get('/axios-turtle-search', (req, res) => {
  res.render('turtle-search', {
    // fill in later???
    layout: 'other_main' // layouts/other_main.handlebars
  });
});

// axios allows us to do the call inside homeRoutes without ever doing an API call in the browser
// this fixes things like CORS issues by not doing them in the browser at all
router.get('/axios-turtle/:term', async (req, res) => {
  // ANY axios call
  const requestUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APIKEY}&q=${req.params.term}&limit=5&offset=0&rating=pg&lang=en&bundle=messaging_non_clips`;
  const data = await axios.get(requestUrl);
  // console.log(axiosDataHere);
  // // simple serialize
  simplifiedData = JSON.parse(JSON.stringify(data.data));

  // found an extra data key for only giphy
  simplifiedData = simplifiedData.data;

  console.log(simplifiedData);
  res.render('axios-turtle', {
    term: req.params.term,
    // apikey: process.env.GIPHY_APIKEY, // do not need to expose api key if using axios

    gifs: simplifiedData,
    // fill in later???
    layout: 'other_main' // layouts/other_main.handlebars
  });
});

module.exports = router;
