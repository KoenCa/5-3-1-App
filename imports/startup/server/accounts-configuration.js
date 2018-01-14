import {Accounts} from 'meteor/accounts-base';

if (Meteor.isServer) {
  Accounts.emailTemplates.siteName = '5/3/1 calculator';
  Accounts.emailTemplates.from = 'Site admin';
  Accounts.emailTemplates.resetPassword = {
    from() {
      return 'Site admin'
    },
    subject() {
      return 'Reset your password for 5/3/1 calculator';
    },
    text(user, url) {
      return `Hey! Reset your password using the following link: ${url}`;
    }
  };
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "Activate your account now!";
    },
    text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
    }
  };
}
