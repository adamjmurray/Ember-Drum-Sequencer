/**
 * An audio sample, which can be played.
 */
DS.Sample = Ember.Object.extend({

  name: null,

  src: null,


  init: function() {
    //var audio = new Audio( this.get('src') );    
    //this.set('audio', audio);    

    function onProgress() {
      if(audio.networkState == HTMLMediaElement.NETWORK_IDLE) {
        console.log('done loading ' + audio.src)
        audio.removeEventListener('progress', onProgress, false);
        audio.removeEventListener('error', onError, false);
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
    
    //audio.addEventListener('progress', onProgress, false);
    //audio.addEventListener('error', onError, false);
    //audio.load();    
  },


  filetype: function() {
    var audio = new Audio();
    if(audio.canPlayType('audio/ogg')) return '.ogg';
    if(audio.canPlayType('audio/mp3')) return '.mp3';
  }.property().cacheable(),


  src: function() {
    return 'audio/' + this.get('name') + this.get('filetype');
  }.property('name').cacheable(),


  play: function(volume) {
    if(volume == null) volume = 1;
    volume *= DS.transport.get('volume'); // scale by global volume
    var audio = this.get('audio');
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }

});
