const crypto=require('crypto');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {to,TE}=require('../global_functions');
const cryptoService=require('../services/cryptoService');


module.exports=(sequelize,DataTypes)=>{
    let Model=sequelize.define('authenticate',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'authenticate',
        timestamps: true,
        paranoid: true,
        underscored: false
    });

    Model.beforeSave(async(user,options)=>{
        let err;
        if(user.changed('password')){
            let hash,salt;
            let rounds=crypto.randomInt(2,8);
            [err,salt]=await to(bcrypt.genSalt(rounds));
            if(err) return TE(err.message);
            [err,hash]=await to(bcrypt.hash(user.password,salt));
            if(err) return TE(err.message);

            user.password=hash;
        }
    });
    Model.prototype.getJwt=async function(){
        let err,token,encryptedToken;
        token= 'Bearer '+jwt.sign({
            id:this.id,
            email:this.email
        },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});

        [err,encryptedToken]=await to(cryptoService.encrypt(token));
        if(err) return TE(err.message);
        return encryptedToken;
    }
    return Model;
}





