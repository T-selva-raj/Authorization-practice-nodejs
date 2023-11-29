const  {to,ReS,ReE}=require('../global_functions');
const authenticate=require('../models').authenticate;
const mailService=require('../services/mailService');
const job=require('cron');

const signUp=async(req,res)=>{
    console.log(req);
    let [err,user]=await to(authenticate.create({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    }));
    if(err) return ReE(res,err,422);
    if(user) return ReS(res,user,200);
}

module.exports.signUp=signUp;



const login=async(req,res)=>{
    let [err,user]=await to (authenticate.findOne({
        where:{
            email:req.body.email
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          }
    }));
    if(err) return ReE(res,err,422);
    
    let token;
    if (user){
        [err,token]=await to(user.getJwt());
        if(err) return ReE(res,err,422);
    }
    let userToken={userdata:user,token:token};


    // **********sending mail*************
    let content='<h1>hii  %name% </h1><br><h2>your password solla mudiyathu </h2>';
    let keyObjects={
        name:user.userName
    };
    let[errr,mail]=await to(mailService.SendMail('selva24@mailinator.com',content,keyObjects));
    // if(errr) return ReE(res,errr,422);
    // const cronJob=new job.CronJob('* * * * * *',function(){
    //     console.log("hello");
    // });
    // cronJob.start();
    if(user&&token) return ReS(res,userToken,200);
    

}

module.exports.login=login;


// const jobFunction=async()=>{
//     const cronJob=new job.CronJob('* * * * * *',function(){
//         console.log("hello");
//     });
//     cronJob.start();
//     }
    