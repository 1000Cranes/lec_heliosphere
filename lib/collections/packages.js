Packages = new Mongo.Collection('packages');
Comments = new Mongo.Collection('comments');
Tutorials = new Mongo.Collection('tutorials');
Ratings = new Mongo.Collection('ratings');
Tags = new Mongo.Collection('tags');


// Packages.attachSchema(new SimpleSchema({
//   easeOfUse: {
//     type: Number,
//     label: "Ease of use (1 - difficult, 10 - very easy)",
//     min: 1,
//     max: 10
//   },
//   content: {
//     type: String,
//     label: "Content"
//   }
// }));
