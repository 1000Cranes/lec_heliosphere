Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('packages', Session.get('tag-filters'), Session.get('rating-filter'), Session.get('search-filter'), Session.get('limit-filter')); }
});

Router.configure({
  layoutTemplate: 'package-page-layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.configure({
  layoutTemplate: 'basic-page-layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});