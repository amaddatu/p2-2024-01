const sequelize = require('../config/connection');
const { User, Project, PocketWatch } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
// import watch data
const pocketWatchData = require("./pocketWatchData.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // for      single of array
  for (const watch of pocketWatchData){
    await PocketWatch.create({
      ...watch, // copy both keys and values from a single watch
      user_id: users[0].id, // getting a first user a rolex
    });
  }

  process.exit(0);
};

seedDatabase();
