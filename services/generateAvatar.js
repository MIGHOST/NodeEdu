const Avatar = require('avatar-builder');
const fs = require('fs').promises;
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

exports.generateAvatar = async email => {
  const avatar = Avatar.male8bitBuilder(128);
  const userAvatar = await avatar.create(email);
  const avatarName = `${email}.png`;
  const avatarPath = path.join(__dirname, `../tmp/${avatarName}`);
  await fs.writeFile(avatarPath, userAvatar);
  return userAvatar;
};

exports.minifyImage = async fileName => {
  const MIN_DIR = './public/images';
  const draftPath = './tmp';
  const files = await imagemin([`${draftPath}/${fileName}`], {
    destination: MIN_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
  await fs.unlink(files[0].sourcePath, files[0].data);

};
