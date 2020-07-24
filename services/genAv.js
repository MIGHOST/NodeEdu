const { promises: fsPromises } = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

exports.generateAvatar = async email => {
  const jdenticon = require('jdenticon'),
    fs = require('fs').promises;
  (size = 200), (value = 'icon value'), (png = jdenticon.toPng(value, size));
  await fs.writeFile(`./tmp/${email}.png`, png);
};

exports.minifyImage = async fileName => {
  const MIN_DIR = 'public/images';
  const files = await imagemin([`tmp/${fileName}.png`], {
    destination: MIN_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
  console.log(files);
  // const { filename, path: draftPath } = req.file;
  await fsPromises.unlink(draftPath);
  req.file = {
    ...req.file,
    path: path.join(MIN_DIR, fileName),
    destination: MIN_DIR,
  };
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
