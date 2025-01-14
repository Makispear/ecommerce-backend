const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const product404Message = 'No product found with this id'


// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category, 
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        through: ProductTag,
        as: 'tags'
      }
    ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => res.status(500).json(err))
});

// get one product
router.get('/:id', (req, res) => {
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
          model: Category,
          attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        through: ProductTag,
        as: 'tags'
      }
    ]
  })
  .then(dbProductData => {
    if (!dbProductData) {
      return res.status(404).json({message: product404Message})
    }
    return res.json(dbProductData)
  })
  .catch(err => res.status(500).json(err))
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product with tags
router.put('/:id', (req, res) => {
  // update product data
  Product.update({
    id: req.body.id,
    tagIds: req.body.tagIds
  }, 
  {
    where: {
      id: req.params.id,
    }
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      console.log(req.body.tagIds)
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete a product 
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProductData => {
    if (!dbProductData) {
      return res.status(404).json({message: product404Message})
    }
    return res.json(dbProductData)
  })
  .catch(err => res.status(500).json(err))
});

module.exports = router;
