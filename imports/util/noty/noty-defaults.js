import Noty from 'noty';

Noty.overrideDefaults({
  layout: 'topCenter',
  timeout: 5000,
  theme: 'relax'
});

function successNoty(text) {
  new Noty({
    type: 'success',
    text: text,
  }).show();
};

function errorNoty(text) {
  new Noty({
    type: 'error',
    text: text,
  }).show();
};

function warningNoty(text) {
  new Noty({
    type: 'warning',
    text: text,
  }).show();
};

function infoNoty(text) {
  new Noty({
    type: 'info',
    text: text,
  }).show();
};

export { successNoty, errorNoty, warningNoty, infoNoty }
