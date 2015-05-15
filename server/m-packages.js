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
    console.log('  Page', count++);
    if (err) return console.log('Error', err);
    if (!res) return console.log('No results returned');
    
    syncToken = res.syncToken || {};

    _.each(res.collections.packages, function(p) {
      console.log('  package', p._id, p.name);
      var cp = Packages.findOne({ 'name': p.name });
      if(cp) {
          console.log('Update package', p.name);
        try {
          Packages.update(cp._id, { $set: { name: p.name, 'meteor.package': p } });
        } catch(e) {
          console.error('ERROR update package', cp, p, e);
        }
      } else {
          console.log('New package', p.name);
        try {
          Packages.insert({ name: p.name, meteor: { package: p } });
        } catch(e) {
          console.error('ERROR insert package', p, e);
        }
      }
    });

    _.each(res.collections.versions, function(v) {
      console.log('New version', v.packageName, v.version);

      var cp = Packages.findOne({ 'name': v.packageName });
      // remove dependencies because we don't need it and it generates error with stevezhu:velocity.js
      delete v.dependencies;
      if(cp) {
        // || semverCompare(v.version, cp.meteor.version.version) >= 0
        if(!cp.meteor || !cp.meteor.version) {
          console.log('  Update version', v.packageName, (cp.meteor && cp.meteor.version) ? cp.meteor.version.version : '0.0.0', '<', v.version);
          try {
            if(cp.meteor && cp.meteor.version && cp.meteor.version.git !== v.git)
              Packages.update(cp._id, { $set: { updateGit: true } });
            Packages.update(cp._id, { $set: { name: v.packageName, 'meteor.version': v } });
          } catch(e) {
            console.error('ERROR update version', cp, v, e);
          }
        } else {
          console.log('  Ignore version ', v.packageName, (cp.meteor && cp.meteor.version) ? cp.meteor.version.version : '0.0.0', '>', v.version);
        }
      } else {
          console.log('  No package for this version', v);
        try {
          Packages.insert({name: v.packageName, meteor: { version: v } });
        } catch(e) {
          console.error('ERROR insert version', v, e);
        }
      }
    });

    // Using setImmediate to allow GC to run each time in case there are a LOT of pages
    if (!res.upToDate) setImmediate(Meteor.bindEnvironment(packageRequest.bind(this, cb)));
    else cb();
  });
};