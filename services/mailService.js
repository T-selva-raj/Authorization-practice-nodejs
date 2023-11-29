const nodeMailer=require('nodemailer');
const{TE}=require('../global_functions');
require('../config/config');


const SendMail=async (receiver,mailContent,keyObject)=>{
    let sender=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:CONFIG.email,
            pass:CONFIG.password
        },
        host:'smtp.gmail.com',
        port:465
    });

    for(let key in keyObject){
        const replaceText="%"+key+"%";
        const regExp=new RegExp(replaceText,'g');
        mailContent=mailContent.replace(regExp,keyObject[key]);
    }

    const composeMail={
        from:'abc@gmail.com',
        to:receiver,
        subject:"testing ",
        html:mailContent
    }

    let[err,mail]=sender.sendMail(composeMail);
    if(err) return TE(err.message);
    // console.log(mail);
    return mail;
}
module.exports.SendMail=SendMail;