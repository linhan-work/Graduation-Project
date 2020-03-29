const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

//登录模块
const login = require('./controller/user')
//拦截token
const longToken = require('./tools/longToken')
const app = new Koa();
//允许跨域
app.use(cors());
//添加formData数据解析
app.use(bodyParser());

//验证token
app.use(async (ctx, next) => longToken.reToken(ctx, next));
app.use(longToken.koaJwt);
// 错误处理
app.use(async (ctx, next) => longToken.dealError(ctx, next))

//添加路由
app.use(login.routes());



//监听3000端口
app.listen(3000);
