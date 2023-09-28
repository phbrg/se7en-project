const express = require('express');
const router = express.Router();
const PostsContoller = require('../controllers/PostsController');

const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, PostsContoller.createPost);
router.get('/dashboard', checkAuth, PostsContoller.dashboard);
router.get('/', PostsContoller.showPosts);
router.get('/edit/:id', checkAuth, PostsContoller.editPost);

router.post('/add', checkAuth, PostsContoller.createPostSave);
router.post('/remove', checkAuth, PostsContoller.removePost);
router.post('/edit', checkAuth, PostsContoller.editPostSave);

module.exports = router;