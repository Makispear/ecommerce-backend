const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const tag404Message = 'No tag found with this id'


// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      return res.status(404).json({message: tag404Message})
    }
    return res.json(dbTagData)
  })
  .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      return res.status(404).json({message: tag404Message})
    }
    return res.json(dbTagData)
  })
  .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      return res.status(404).json({message: tag404Message})
    }
    return res.json(dbTagData)
  })
});

module.exports = router;
