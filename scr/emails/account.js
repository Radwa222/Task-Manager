const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

const SendWelcomMessage=(email,name)=>{
    const mail ={
        to:email,
        from:'radwayasser90@gmail.com',
        subject:`welcom ${name}`,
        text:'tell us about our aapp'
    }
    sgMail.send(mail)

}
const CancelationMail=(email,name)=>{
    const mail={
        to:email,
        from:'radwayasser90@gmail.com',
        subject:`welcom ${name}`,
        text:'why u did this .. Give us your feedback'

    }

    sgMail.send(mail)

}
module.exports={
    SendWelcomMessage,
    CancelationMail
}

