import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check';

Meteor.methods({
  'accounts.changeEmail' (email) {
    check(email, String);
    const user = Meteor.user();
    const oldEmail = user.emails[0].address;

    if (!user) {
      throw new Meteor.Error('Not authorized');
    }

    Accounts.removeEmail(user._id, oldEmail);

    try {
      Accounts.addEmail(user._id, email);
    } catch (e) {
      Accounts.addEmail(user._id, oldEmail);
      throw e;
    }
  }
})
