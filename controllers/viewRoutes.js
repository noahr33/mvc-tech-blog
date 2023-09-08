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
    console.log(blogs)
    res.render('home', { blogs })
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router