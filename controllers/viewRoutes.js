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
    res.render('home', { blogs, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/dashboard', async (req, res) => {
  const userId = req.session.user_id
  if (!userId) {
    res.redirect('/login')
  }
  try {
    const dashboardData = await Blog.findAll({
      attributes: ['id', 'user_id', 'blog_title', 'content'],
      where: {
        user_id: req.session.user_id
      }
    })
    const usersBlogs = dashboardData.map(blog => blog.get({ plain: true }))
    console.log(usersBlogs)
    res.render('dashboard', { usersBlogs, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500)
  }
})

// login route
router.get('/login', async (req, res) => {
  try {
    res.render('login')
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
    res.render('blogpost', { ...blog, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router