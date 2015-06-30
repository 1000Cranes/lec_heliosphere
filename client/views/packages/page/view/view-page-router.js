Router.route('/packages/:_id', {
  name: 'packagePage',
  data: function() { return Packages.findOne(this.params._id); },
  layoutTemplate: "package-page-layout"
});
Router.onBeforeAction('dataNotFound', {only: 'packagePage'});