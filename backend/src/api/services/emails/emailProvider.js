const nodemailer = require('nodemailer');
const Email = require('email-templates');
const { emailConfig } = require('../../../config/vars');

const transporter = nodemailer.createTransport({
  port: emailConfig.port,
  host: emailConfig.host,
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
  secure: false,
});

transporter.verify((error) => {
  if (error) {
    console.log('Error with email connection');
  }
});

/**
 * Send email to secret friend.
 *
 */
exports.sendSecretFriendEmail = async (mailOptions) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: `Amigo Secreto <${emailConfig.emailSender}>`,
    },
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'secretFriend',
      message: {
        to: mailOptions.email,
      },
      locals: {
        name: mailOptions.name,
        secretFriendName: mailOptions.secretFriend.name,
      },
    })
    .catch(() => console.log('Error sending secret friend email'));
};
