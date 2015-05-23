Router.route('/packages/:_id', {
  name: 'packagePage',
  data: function() { return Packages.findOne(this.params._id); }
});
Router.onBeforeAction('dataNotFound', {only: 'packagePage'});