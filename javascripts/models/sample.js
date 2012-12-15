/**
 * An audio sample, which can be played.
 */
DS.Sample = Ember.Object.extend({

  name: null,

  src: null,


  init: function() {
    var audio = new Audio( this.get('src') );        
    /*
    function onProgress() {
      if(audio.networkState == HTMLMediaElement.NETWORK_IDLE) {
        console.log('done loading ' + audio.src)
      }
    }

    var retryCount = 0;
    function onError() {
      if(retryCount < 2) {
        console.log("Couldn't load audio '" + audio.src + "', retrying...");
        // This shouldn't be necessary, but Safari randomly fails to load some samples.
        // I guess I might be requesting too many samples at the same time? But it's arguably
        // a bug in Safari because Chrome and Firefox seem to work fine without this retry system.
        retryCount++;
        audio.load();
      } else {
        console.error("Failed to load audio '" + audio.src + "': " + audio.error);
      }
    }
    
    audio.addEventListener('progress', onProgress, false);
    audio.addEventListener('error', onError, false);
    */
    audio.load();
    this.set('audio', audio);       
  },


  filetype: function() {
    var audio = new Audio();
    if(audio.canPlayType('audio/ogg')) return '.ogg';
    if(audio.canPlayType('audio/mp3')) return '.mp3';
  }.property().cacheable(),


  src: function() {
    return 'audio/' + this.get('name') + this.get('filetype');
  }.property('name','filetype').cacheable(),


  play: function(volume) {
    if(volume == null || volume > 1) volume = 1;
    if(volume < 0) volume = 0;
    
    var audio = this.get('audio');
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }

});
