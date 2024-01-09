const User = require('./User');
const Project = require('./Project');
// index must have ALL models - no exceptions
const PocketWatch = require('./PocketWatch');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

// 1 user can have many pocketwatches
User.hasMany(PocketWatch, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// a pocketwatch can only have 1 user
// foreign key is on pocketwatch
PocketWatch.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project, PocketWatch };
