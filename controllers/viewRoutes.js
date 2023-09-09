const router = require('express').Router()
const { Blog, User, Comment } = require('../models')
const sequelize = require('sequelize')

// Homepage
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [User],
      raw: true
    })
    res.render('home', { blogs })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/blog-post/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [{ model: User }],
      raw: true,
    })
    console.log(blog)
    res.render('blogpost', blog)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router