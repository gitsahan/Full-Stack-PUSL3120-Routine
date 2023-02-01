const {list} = require ('./models/list.model');
const {schedules} = require ('./models/schedule.model');
const { User } = require ('./models/user.model');

module.exports = {
    list,
    schedules,
    User,
}