const Card = require('../models/cards');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const newCard = await new Card({ name, link, owner: req.user._id });

    return res.status(201).send(await newCard.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: `${err.message}` });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    if (!card) {
      throw new Error('NotFound');
    }

    return res.send({ message: 'Карточка успешно удалена' });
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Карточка с указанным id не найдена' });
    }

    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Передано невалидное id карточки' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const newCardData = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );

    if (!newCardData) {
      throw new Error('NotFound');
    }

    return res.send(newCardData);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Передан несуществующий id карточки' });
    }

    if (err.name === 'CastError') {
      return res
        .status(400)
        .send({ message: 'Переданы некорректные данные для постановки лайка' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const newCardData = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );

    if (!newCardData) {
      throw new Error('NotFound');
    }

    return res.send(newCardData);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res
        .status(404)
        .send({ message: 'Передан несуществующий id карточки' });
    }

    if (err.name === 'CastError') {
      return res
        .status(400)
        .send({ message: 'Переданы некорректные данные для снятия лайка' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
