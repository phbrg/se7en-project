const Posts = require('../models/Posts');
const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = class PostsContoller {
    static async showPosts(req, res) {
        let search = '';

        if(req.query.search) {
            search = req.query.search;
        }

        let order = 'DESC';

        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const postsData = await Posts.findAll({
                include: User,
                where: {
                    title: {[Op.like]: `%${search}%`}
                },
                order: [['createdAt', order]]            
            });

        const posts = postsData.map((result) => result.get({ plain: true }));

        res.render('posts/home', { posts, search });
    }

    static async dashboard(req, res) {
        const userId = req.session.userid;

        const user = await User.findOne({ where: {id: userId }, include: Posts, plain: true });

        if(!user) {
            res.redirect('/login');
            
            return;
        }

        const posts = user.Posts.map((result) => result.dataValues);
        let emptyPosts = false;

        if(posts.length <= 0) {
            emptyPosts = true;
        }
        
        res.render('posts/dashboard', { posts, emptyPosts });
    }

    static createPost(req, res) {
        res.render('posts/create');
    }

    static async createPostSave(req, res) {
        const post = {
            title: req.body.title,
            UserId: req.session.userid,
        };

        const user = await User.findOne({ where: { id: post.UserId } });

        if(!user) {
            res.redirect('/login');

            return;
        }

        try {
            await Posts.create(post);

            req.session.save(() => {
                res.redirect('/posts/dashboard');
            });
        } catch(err) {
            console.error(`Post error: ${err}`);
        }
    }

    static async removePost(req, res) {
        const userId = req.session.userid;
        const postId = req.body.id;

        const user = await User.findOne({ where: {id: userId }, include: Posts, plain: true });

        if(!user) {
            res.redirect('/login');
            
            return;
        }

        try {
            await Posts.destroy({ where: { id: postId, UserId: userId } });

            res.redirect('/posts/dashboard');
        } catch(err) {
            console.log(`Remove post error: ${err}`);
        }
    }

    static async editPost(req, res) {
        const postId = req.params.id;
        const userId = req.session.userid;

        Posts.findOne({ where: { id: postId }, raw: true })
            .then((post) => {
                const ownerId = post.UserId;
                if(userId !== ownerId) {
                    res.redirect('/posts/dashboard');

                    return;
                }
                res.render('posts/edit', { post })
            })
            .catch((err) => console.log(`Edit error: ${err}`))
    }

    static async editPostSave(req, res) {
        const formId = req.body.id;

        const post = {
            title: req.body.title
        }

        Posts.update(post, { where: { id: formId } })
            .then(() => {
                req.session.save(() => {
                    res.redirect('/posts/dashboard')
                })
            })
            .catch((err) => console.log(`Update error: ${err}`));
    }
}