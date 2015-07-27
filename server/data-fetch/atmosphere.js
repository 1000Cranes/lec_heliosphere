// atmosphere pulls in 100 with the lowest count
// when finished increment the count by one.

atmosphereUpdate = function (p) {
  if(!p) return;

  try {
    // get atmosphere info
    var res = HTTP.get('https://atmospherejs.com/a/packages/findByNames?names='+p.name, { headers: { Accept: 'application/json' } });
    
    // we want the installs per year, stars, git, and count
    var installs_per_year = res.data[0]["installs-per-year"];
    var stars = res.data[0].starCount;
    var score = res.data[0].score;
    var git = res.data[0].latestVersion.git;
    var description = res.data[0].latestVersion.description;
    var counter = p.counter + 1;
    
    Packages.update(p._id, { $set: { installs_per_year: installs_per_year, stars: stars, score: score, git: git, description: description, counter: counter } });
    console.log('package updated ... ', p._id, p.name, p.counter);
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

atmospheresUpdate = function() {
  console.log('Get Atmosphere...');
  if(atmospheresUpdateInProgress) return console.log('atmospheresUpdate already in progress');

  atmospheresUpdateInProgress = true;

  // Update those who are marked as need to update and have good github
//   var updated = 0;
//   Packages.find({ updateAtmos: true }).forEach(function (p) { atmosphereUpdate(p); console.log('updated - ' + updated++ ); });
//   Packages.update({  updateAtmos: true }, { $unset: {  updateAtmos: '' } }, { multi: true });

  // Update those who we never tried
  var needUpdate = Packages.find({}, {sort: {counter: 1}, limit: 250});
  console.log('Updating: ', needUpdate.count());
  var updated = 0;
  needUpdate.forEach(function (p) {
    atmosphereUpdate(p);
    console.log('updated - ' + updated++ );
  });

  atmospheresUpdateInProgress = false;
  console.log('Done');
};