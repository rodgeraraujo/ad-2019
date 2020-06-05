const { emailConfig } = require('../../../config/vars');
const sendgridMail = require('@sendgrid/mail');

/**
 * Send email to secret friend.
 *
 */
exports.sendSecretFriendEmail = async (mailOptions) => {
  const email = {
    from: emailConfig.emailSender,
    to: mailOptions.email,
    subject: 'Resultado do sorteio do amigo secreto',
    text: `
    Olá ${mailOptions.name},
    Seu amigo secreto é <strong>${mailOptions.secretFriend.name}<strong>.`,
  };

  sendgridMail.setApiKey(emailConfig.sendgridKey);

  sendgridMail
    .send(email)
    .then(() => {
      console.log('Message sent');
    })
    .catch((error) => {
      console.log(error.response.body);
      // console.log(error.response.body.errors[0].message)
    });
};
