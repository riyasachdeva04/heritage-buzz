const User = require('./user.js');
const Request = require('./request.js');

User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Request };