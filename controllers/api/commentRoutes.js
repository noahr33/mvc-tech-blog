const router = require('express').Router()
const { Comment } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    })

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    res.render('blogpost', { comments, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router