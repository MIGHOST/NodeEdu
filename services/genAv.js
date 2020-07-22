exports.generateAvatar = async email => {
  const jdenticon = require('jdenticon'),
    fs = require('fs').promises;
  (size = 200), (value = 'icon value'), (png = jdenticon.toPng(value, size));
  await fs.writeFile(`./tmp/${email}.png`, png);
};

// const Avatar = require('avatar-builder');
// const fs = require('fs');
// const path = require('path');
// const util = require('util');
// const writeFile = util.promisify(fs.writeFile);

// exports.generateAvatar = async email => {
//   const avatar = Avatar.male8bitBuilder(128);
//   const userAvatar = avatar.create(email);
//   fs.writeFile(`../tmp/${email}.png`);
//   return userAvatar;
// };
