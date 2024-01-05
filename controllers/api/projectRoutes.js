const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
// // helps read maps_api_key
// require('dotenv').config();

router.post('/', withAuth, async (req, res) => {
  // // reading maps_api_key
  // if(process.env.MAPS_API_KEY){
  //   console.log("I have the api key for maps");
  // }
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
