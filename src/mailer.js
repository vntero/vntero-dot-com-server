const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'derrick97@ethereal.email',
    pass: 'K5wNEe7fqusrrAXAmD',
  },
})

const mailOptions = {
  from: 'derrick97@ethereal.email',
  to: 'derrick97@ethereal.email',
  subject: 'Hello from Nodemailer',
  text: 'This is a test email sent from Nodemailer.',
  html: html,
  attachments: [
    {
      filename: 'aeler_logo.png',
      path: '../assets/aeler_logo.png',
      cid: 'aelerlogo',
    },
    {
      filename: 'facebook_ico.png',
      path: '../assets/facebook_ico.png',
      cid: 'facebooklogo',
    },
    {
      filename: 'instagram_ico.png',
      path: '../assets/instagram_ico.png',
      cid: 'instagramlogo',
    },
    {
      filename: 'linkedin_ico.png',
      path: '../assets/linkedin_ico.png',
      cid: 'linkedinlogo',
    },
    {
      filename: 'twitter_ico.png',
      path: '../assets/twitter_ico.png',
      cid: 'twitterlogo',
    },
    {
      filename: 'url_ico.png',
      path: '../assets/url_ico.png',
      cid: 'urllogo',
    },
    {
      filename: 'youtube_ico.png',
      path: '../assets/youtube_ico.png',
      cid: 'youtubelogo',
    },
  ],
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message)
  } else {
    console.log('Email sent successfully!', info.messageId)
  }
})