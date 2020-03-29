const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const tokenModel = require('../service/tokenModel');
class Jwt {
    constructor(data) {
        this.data = data;
    }
    //生成token
    generateToken() {
        let data = this.data;
        let create = Math.floor(Date.now()/1000);
        //加载私钥
        let cert = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'));
        let token = jwt.sign({
            data,
            exp: create + 60 * 30,
        }, cert, {algorithm: 'RS256'})
        return token;
    }
    // 验证token
    async verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
        let res;
        try {
            jwt.verify(token, cert, { algorithms: ['RS256']}) || {};
        }catch(e) {
            if (e.message = 'jwt expired') {
                let rs = await tokenModel.ifHasToken(this.data);
                console.log(rs);
                //查询不到就为[]
                if(rs[0]) {
                    rs = JSON.parse(JSON.stringify(rs));
                    // console.log(rs);
                    
                    res = rs[0].id;
                }
            }
        }
        return res;
    }
    //token持久化
    async insertToken() {
        let rs = await tokenModel.inToken(this.data);
        rs = JSON.parse(JSON.stringify(rs));
        if (rs.affectedRows === 1) {
            return true;
        }
        
        return false;
    }
    // 数据库是否存在token
    async ifHasToken() {
        let rs = await tokenModel.ifHasToken(this.data);
        rs = JSON.parse(JSON.stringify(rs));
        if(rs) {
            return true;
        }
        return false;
    }
    // 更新token
    upToken(token) {
        this.data = token;
    }
    // 更新数据库Mysql
    async upTokenMysql(id) {
        let rs = await tokenModel.upToken(this.data, id);
        // console.log(rs);
    }
    // 删除Mysql token
    async deleteToken() {
        let rs = await tokenModel.deleteT(this.data);
        rs = JSON.parse(JSON.stringify(rs));
        return rs;
    }
}

module.exports = Jwt;