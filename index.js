const port = 3000;
const conn = require('./db/conn');

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session
app.use(
  session({
    name: 'session',
    secret: 'se7en_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: true,
    },
  })
);

// flash
app.use(flash());

// templates
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// controllers
const Posts = require('./models/Posts');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const PostsContoller = require('./controllers/PostsController');

// routes
app.use('/posts', postsRoutes);
app.use('/', authRoutes);

app.get('/', PostsContoller.showPosts);

// server
conn
  //.sync({force:true})
  .sync()
  .then(() =>
    app.listen(port, () => console.log(`> Server on | http://localhost:${port}`))
  )
  .catch((err) => console.log(`Sync Error: ${err}`));