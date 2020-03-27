const express = require('express')
const router = express.Router()
const User = require('./user')

// authentication middleware
const requireUser = async (req, res, next) => {
  const userId = req.session.userId
  console.log('TCL: requireUser -> req.session', req.session)
  if (userId) {
    const user = await User.findOne({ _id: userId })
    res.locals.user = user
    next()
  } else {
    return res.redirect('/login', 301)
  }
}

router.get('/', requireUser, (req, res) => {
  res.render('index')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const data = {
    username: username,
    password: password
  }

  try {
    const user = await User.create(data)
  } catch (e) {
    console.log(e)
  }
  res.redirect('/login')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
    const user = await User.authenticate(email, password)
    if (user) {
      req.session.userId = user._id
      return res.redirect('/')
    } else {
      return res.redirect('/login')
    }
  } catch (e) {
    return next(e)
  }
})

router.get('/logout', (req, res) => {
  //https://github.com/expressjs/cookie-session#destroying-a-session
  req.session = null //Destroy the session
  res.redirect('/login')
})

module.exports = router
