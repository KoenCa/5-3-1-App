import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// This method still needs to be called using Meteor.call
// Accounts doesn't work if imported on client side
export const changeEmail = new ValidatedMethod({
  name: 'accounts.changeEmail',
  validate: new SimpleSchema({
    email: {type: String}
  }).validator(),
  run({email}) {
    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error('Not authorized');
    }
    
    const oldEmail = user.emails[0].address;
    Accounts.removeEmail(user._id, oldEmail);

    try {
      Accounts.addEmail(user._id, email);
    } catch (e) {
      Accounts.addEmail(user._id, oldEmail);
      throw e;
    }
  }
});
