/**
 * A drum pattern, which consists of a collection of tracks.
 */
DS.PatternController = Ember.Controller.extend({

  tracks: null,

  
  init: function() {
    var tracks = ['kick', 'snare', 'hat', 'clap'].map(function(name){ return DS.Track.create({name: name}); });
    this.set('tracks', tracks);    
  },


  stepAt: function(trackIndex, stepIndex) {
    return this.tracks[trackIndex].steps[stepIndex];
  },


  updateTrackStates: function(states) {
    var self = this;
    var tracks = this.get('tracks');
    states.forEach(function(state, index) {
      var trackState = self.trackStateHexToBinary(state);
      var track = tracks[index];
      for(var i=0,len=trackState.length; i<len; i++) {
        var stepIsActive = (trackState.charAt(i) === '1');
        //console.log("setting track " + index + ", step " + i + " isActive to " + stepIsActive);
        track.get('steps')[i].set('active', stepIsActive);
      }
    });    
  },


  trackStateHexToBinary: function(hex) {
    var binary = parseInt(hex,16).toString(2);
    while(binary.length < DS.STEP_COUNT) binary = '0'+binary;
    return binary;
  }

});
