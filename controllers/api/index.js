const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const pocketwatchRoutes = require('./pocketWatchRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/pocketwatchRoutes', pocketwatchRoutes);

module.exports = router;
