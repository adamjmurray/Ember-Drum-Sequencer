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

  /**
   * Serialize the tracks' state into a list of hexadecimal strings
   */
  serialize: function() {
    var tracks = this.get('tracks');
    return tracks.map(function(track){ return track.serialize(); });
  },

  /**
   * Set the tracks' state from a list of hexadecimal strings
   */
  deserialize: function(hexadecimals) {
    var self = this;
    var tracks = this.get('tracks');
    tracks.forEach(function(track, index) {
      var hexadecimal = hexadecimals[index];
      if(hexadecimal) track.deserialize(hexadecimal);      
    });    
  }
});
