// Note to self - to limit the number of calls to atmosphere, I should have a counter.
// on insert = 0



//var SyncTokens = new Mongo.Collection('syncTokens');
var count = 1;
var remote;
var mPackagesUpdateInProgress = false;
var syncToken = {};

mPackagesUpdate = function () {
  if(mPackagesUpdateInProgress) return console.log('package update already in progress');
  mPackagesUpdateInProgress = true;
  console.log('Get packages from Meteor...');
  count = 1;
  remote = remote || DDP.connect('http://packages.meteor.com');
  packageRequest(function () {
    console.log('Done');
    mPackagesUpdateInProgress = false;
  });
};

packageRequest = function (cb) {
  remote.call('syncNewPackageData', syncToken, {}, function (err, res) {
    //console.log('  Page', count++);
    if (err) return console.log('Error', err);
    if (!res) return console.log('No results returned');
    
    syncToken = res.syncToken || {};

    _.each(res.collections.packages, function(p) {
      //console.log('  package', p._id, p.name);
      var cp = Packages.findOne({ 'name': p.name });
      if(!cp) {
        try {
          Packages.insert({ name: p.name, counter: 0 });
           console.log('package inserted ... ', p._id, p.name);
        } catch(e) {
          console.error('ERROR insert package', p, e);
        }
      } 
    });

    // Using setImmediate to allow GC to run each time in case there are a LOT of pages
    if (!res.upToDate) setImmediate(Meteor.bindEnvironment(packageRequest.bind(this, cb)));
    else cb();
  });
};