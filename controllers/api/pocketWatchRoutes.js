const router = require('express').Router();
const { PocketWatch } = require('../../models');
// withAuth will make sure that we have user data
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try{
    // brend,
    //model,
    //price
    const newWatch = await PocketWatch.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWatch);
  }catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;