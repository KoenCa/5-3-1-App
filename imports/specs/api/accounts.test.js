import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {Accounts} from 'meteor/accounts-base';

import {changeEmail} from '../../api/accounts';

if (Meteor.isServer) {
  describe('Accounts', function() {
    describe('methods', function() {
      const email = 'jaap@gmail.com';

      beforeEach(function() {
        Accounts.createUser({
          email: email,
          password: 'test123'
        });
        sinon.stub(Meteor, 'user');
      });

      afterEach(function() {
        Meteor.user.restore();
        Meteor.users.remove({});
      });

      describe('#changeEmail', function() {
        it('should change the email of a given user', function() {
          const user = Accounts.findUserByEmail(email);
          const newEmail = 'koen@gmail.com';

          Meteor.user.returns(user)
          const methodInvocation = {};
          const args = {email: newEmail};

          changeEmail._execute(methodInvocation, args);

          changedUser = Accounts.findUserByEmail(newEmail);
          expect(changedUser).to.exist;
          expect(changedUser.emails.length).to.eql(1);
          expect(changedUser.emails[0].address).to.eql(newEmail);
        });

        it('should throw an error when there is no user', function() {
          const user = Accounts.findUserByEmail(email);
          const newEmail = 'koen@gmail.com';

          Meteor.user.returns(null) // No user is logged in
          const methodInvocation = {};
          const args = {email: newEmail};

          expect(() => changeEmail._execute(methodInvocation, args)).to.throw(
            Meteor.Error, 'Not authorized'
          );
        });
      });
    });
  });
}
