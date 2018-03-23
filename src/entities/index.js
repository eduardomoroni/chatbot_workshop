const { Weather } = require('./weather');
const { Greeting } = require('./greeting');
const { Farewell } = require('./farewell');
const {
  answerInvalidQuestion,
  answerError,
} = require('../answers');

const INVALID_ENTITY = 'Invalid Entity';

const getEntity = entities => {
  if (entities.hasOwnProperty('greeting')) {
    return new Greeting();
  }

  if (entities.hasOwnProperty('farewells')) {
    return new Farewell();
  }

  if (entities.hasOwnProperty('weather')) {
    const city = 'POA'; //DEVEMOS PEGAR ISTO DO WITAI
    const date = new Date(); //DEVEMOS PEGAR ISTO DO WITAI
    return new Weather(city, date);
  }

  throw new Error(INVALID_ENTITY);
};

const answer = async parsedMessage => {
  try {
    const entity = getEntity(parsedMessage.entities);
    return await entity.answer();
  } catch ({ message }) {
    if (message === INVALID_ENTITY) {
      return answerInvalidQuestion();
    }

    return answerError();
  }
};

module.exports = {
  answer,
  INVALID_ENTITY,
};