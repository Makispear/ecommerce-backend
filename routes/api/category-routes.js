const router = require('express').Router()
const { Category, Product } = require('../../models')
const category404Message = 'No category found with this id'

// The `/api/categories` endpoint

// get all categories 
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => res.status(500).json(err))
})

// get one category 
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      return res.status(404).json({message: category404Message})
    }
    return res.json(dbCategoryData)
  })
  .catch(err => res.status(500).json(err))
})

// add a category 
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => res.status(500).json(err))
})

// update a category 
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      return res.status(404).json({message: category404Message})
    }
    return res.json(dbCategoryData)
  })
  .catch(err => res.status(500).json(err))
})

// delete a category 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      return res.status(404).json({message: category404Message})
    }
    return res.json(dbCategoryData)
  })
  .catch(err => res.status(500).json(err))
})

module.exports = router
