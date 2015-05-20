atmosphereUpdate = function (p) {
  if(!p) return;

  try {
    // get atmosphere info
    //console.log('package', p.name);
    var res = HTTP.get('https://atmospherejs.com/a/packages/findByNames?names='+p.name, { headers: { Accept: 'application/json' } });

    //console.log('res', res);
    delete res.data[0].latestVersion.published;
    res.data[0].installs_per_year = res.data[0]["installs-per-year"];
    delete res.data[0]["installs-per-year"];
    Packages.update(p._id, { $set: { atmos: res.data } });
    console.log('package updated ... ', p._id, p.name);
  } catch(e) {
    if(e && e.response && e.response.statusCode === 404) {
      console.error('  404', e, e.response);
    } else {
      console.error('  Error getting info about atmospherejs package', e, e.response);
    }
    return;
  }
};

var atmospheresUpdateInProgress = false;
atmospheresUpdate = function(limit) {
  console.log('Get Atmosphere...');
  if(atmospheresUpdateInProgress) return console.log('atmospheresUpdate already in progress');

  atmospheresUpdateInProgress = true;

  // Update those who are marked as need to update and have good github
  //Packages.find({ updateAtmos: true }).forEach(function (p) { atmosphereUpdate(p); });
  //Packages.update({  updateAtmos: true }, { $unset: {  updateAtmos: '' } }, { multi: true });

  // Update those who we never tried
  //, { limit: limit||100 }
  var needUpdate = Packages.find({ atmos: { $exists: false }}, { limit: limit||100 });
  console.log(' needUpdate', needUpdate.count());
  var updated = 0;
  needUpdate.forEach(function (p) {
    atmosphereUpdate(p);
    console.log('updated - ' + updated++ );
  });

  atmospheresUpdateInProgress = false;
  console.log('Done');
};