'use strict';
const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  ExitCode,
  TITLES,
  DEFAULT_COUNT,
  GENERATED_FILE_NAME,
  SENTENCES,
  IMAGE_FILE_NAMES,
  CATEGORIES
} = require(`../../constants`);

const PictureRestrict = {
  MIN: 1,
  MAX: 1000,
}

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const getPictureFileName = (i) => {
  return IMAGE_FILE_NAMES[i];
}

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    if (count > 1000) {
      console.log(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(GENERATED_FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
}
