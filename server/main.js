import { Meteor } from 'meteor/meteor';

import '../imports/startup/server';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL=`smtps://mygmail%40gmail.com:${encodeURIComponent("myPassword")}@smtp.gmail.com:465/`;
});
