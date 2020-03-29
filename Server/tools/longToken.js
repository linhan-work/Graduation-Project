const fs = require('fs');
const path = require('path');
const koajwt = require('koa-jwt');
const JwtUitl = require('./jwt');

//拦截token 判断是否过期
let reToken = async (ctx, next) => {
    //获取token
    let auth = ctx.request.header.authorization;
    if(auth) {
        //分离token
        const parts = ctx.request.header.authorization.split(' ');
        const scheme = parts[0];
        const credentials = parts[1];
        //判断token格式
        if (/^Bearer$/i.test(scheme)) {
            let jt  = new JwtUitl(credentials);
            let id = await jt.verifyToken(); //验证token是否存在数据库, 存在就生成新的token, 并更新至数据库            
            if(id) {
                let jtt = new JwtUitl(ctx.request.body.user_name);
                // 生成新token
                let newToken = jtt.generateToken();
                jt.upToken(newToken);
                //插入数据库
                await jt.upTokenMysql(id);
                //更新header中token
                ctx.request.header.authorization = 'Bearer ' + newToken;
                //将token设置到response
                ctx.res.setHeader('authorization', newToken);
            }
        }
    }
    return next();//执行下一个中间件
}

//验证token
const cert = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
let kt = koajwt({
    secret: cert
}, { algorithms: ['RS256'] }).unless({
    path: [/\/login/]
})
//处理错误
let dealError = async (ctx, next) => {
    // console.log(ctx.request.header.authorization);
    
    return next().catch((err) => {
        if (err.status === 401) {
            // console.log(err.message);
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    })
}
module.exports = {
    koaJwt: kt,
    dealError: dealError,
    reToken: reToken
}
