const session = require('express-session');
const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        const checkIfEmailExist = await User.findOne({ where: { email: email } });
        const checkIfUserExist = await User.findOne({ where: { name: name } });

        if(password !== confirmpassword) {
            req.flash('message', 'Passwords does not match');
            res.render('auth/register');

            return;
        } else if(password.length < 6) {
            req.flash('message', 'Your password is too short');
            res.render('auth/register');

            return; 
        } else if(name.length < 3) {
            req.flash('message', 'Your name is too short');
            res.render('auth/register');

            return;
        } else if(checkIfUserExist) {
            req.flash('message', 'This name is alredy registered');
            res.render('auth/register');

            return;
        } else if(checkIfEmailExist) {
            req.flash('message', 'This e-mail is alredy registered');
            res.render('auth/register');

            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword
        }

        User.create(user)
            .then((user) => {
                req.session.userid = user.id;

                req.session.save(() => {
                    res.redirect('/');
                })
            })
            .catch((err) => console.log(err));
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if(!user) {
            req.flash('message', 'Invalid credentials.')
            res.render('auth/login');

            return;
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(!passwordMatch) {
            req.flash('message', 'Invalid credentials.')
            res.render('auth/login');

            return;
        }

        req.session.userid = user.id;

        req.session.save(() => {
            res.redirect('/');
        });
    }
}