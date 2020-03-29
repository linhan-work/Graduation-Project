const Router = require('koa-router');
const JwtUtil = require('../tools/jwt');
const userModel = require('../service/userModel');
const router = new Router();
/**
 * showdoc
 * @catalog 接口文档/用户相关
 * @title 用户登录
 * @description: 用户登录接口
 * @method post
 * @url /user/login
 * @param username 必选 string 用户名
 * @param password 必选 string 密码
 * @return: {"data":{token":"e******hvQGUwE"}} {"msg": 'wrong username or password'}
 * @return_param data json
 * @return_param msg string 提示信息
 * @remark 成功返回200 失败返回401
 */
router.post("/login", async ctx => {
    // console.log(ctx.request);
    const {user_name, user_password} = ctx.request.body;
    let rs = await userModel.login(user_name, user_password);
    rs = JSON.parse(JSON.stringify(rs));
    //判断是否存在
    if (rs) {
        //生成token
        let jwt = new JwtUtil(user_name);
        let token = jwt.generateToken();
        ctx.status = 200;
        ctx.body =  JSON.stringify({
            data: {
                token: token
            }
        });
    } else {
        ctx.status = 401;
        ctx.body =  JSON.stringify({
            msg: 'wrong username or password'
        })
    }
})

/**
 * showdoc
 * @catalog 接口文档/用户相关
 * @title 用户注销
 * @description: 用户注销接口
 * @method post
 * @url /user/logout
 * @return: {"msg":"lougout"} {"msg": 'failed'}
 * @return_param msg string 提示信息
 * @remark 前端注销, 清除token, 后端清除数据库token
 */
router.post('/logout', async ctx => {
    const parts = ctx.request.header.authorization.split(' ');
    //删除token
    let jt =new JwtUtil(parts[1]);
    let rs = await jt.deleteToken();
    if(rs.affectedRows == 1) {
        ctx.status = 200;
        ctx.body = JSON.stringify({
            msg: 'logout'
        })
    }
    //注销失败
    ctx.status = 500;
    ctx.body = JSON.stringify({
        msg: 'failed'
    })
})
/**
 * showdoc
 * @catalog 接口文档/用户相关
 * @title 修改账户密码
 * @description: 用户修改账户密码
 * @method post
 * @url /user/changepassword
 * @param username 必选 string 用户名
 * @param oldPassword 必选 string 旧密码
 * @param user_name 必选 string 用户名
 * @return: {"msg":"succeed"} {"msg": 'failed'}
 * @return_param msg string 提示信息
 * @remark 成功返回200 
 */
router.post('/changepassword', async ctx => {
    const {oldPassword, newPassword, user_name} = ctx.request.body;
    if(oldPassword == newPassword) {
        let rs = await userModel.changePassword(user_name, newPassword);
        rs = JSON.stringify(JSON.parse(rs));
        if(rs.affectedRows == 1) {
            ctx.status = 200;
            ctx.body = JSON.stringify({
                msg: 'succeed'
            })
        }
        
    }
    ctx.body = JSON.stringify({
        msg: 'failed'
    })
})

/**
 * showdoc
 * @catalog 接口文档/用户相关
 * @title 个人信息
 * @description: 查看个人信息
 * @method get
 * @url /user/personal
 * @param username 必选 string 用户名
 * @return: {"data":"succeed"} {"msg": 'failed'}
 * @return_param data json 用户信息
 * @remark 成功返回200
 */
router.get('/personal', async ctx => {
    let user_name = ctx.request.body.user_name;
    let rs = await userModel.getPersonal(user_name);
    rs = JSON.parse(JSON.stringify(rs));
    ctx.status = 200;
    ctx.body = JSON.stringify(rs);
})
module.exports = router;