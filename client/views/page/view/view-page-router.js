// Router.route('/packages/:_id', {
Router.route('/:owner/:package', {
  name: 'packagePage',
  data: function() { 
    var packageName = this.params.owner == 'meteor' ? this.params.package : this.params.owner + ":" + this.params.package;
    return Packages.findOne({name: packageName}); 
  },
  layoutTemplate: "package-page-layout"
});
Router.onBeforeAction('dataNotFound', {only: 'packagePage'});