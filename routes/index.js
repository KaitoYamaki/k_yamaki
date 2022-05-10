const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');
const models = require('../models/index')

const route = new Route();

// function style
route.get('/', function (req, res, _next) {
  res.render('index', { title: 'Express', user: req.user });
});

route.get('/teams/create', forceLogin, 'teams_controller@create');

router.post('/teams/create', async function(req, res, next) { // --- [1]
  const num = (new Date()).getTime();
  const team = models.Team.build({ name: req.body.name, ownerId: `3` });
  await Team.save(); // --- [2]
  res.redirect('/');
});

// 作成フォームの作成
// router.get('/teams/create', async function(req, res, next){
//   const teams = await models.Team.findAll();
//   res.render('teams/create', {title: 'チームの作成', contact: {}, teams});
// });


// single style
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');

// resource style
// route.resource('examples', 'examples_controller');
route.resource('teams', 'teams_controller');
// route.resource('teams', { controller: 'teames_controller', only: ['create'] });

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');

module.exports = route.router;
