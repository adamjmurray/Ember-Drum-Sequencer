/**
 * The Transport is the controller for the application.
 * It manages playback via a setInterval()-based scheduler, and controls playback-related state such as volume.
 */
DS.TransportController = Ember.Controller.extend({

  currentStep: -1,

  bpm: 120,

  volume: 0.25,

  playing: false,

  pattern: null,

  _bpmChanged: false,
  

  init: function() {
    this.set('target', this);
  },


  period: function() {
    return 60000/this.bpm;
  }.property('bpm').cacheable(),


  volumePercentage: function() {
    return Math.round( this.get('volume') * 100 );    
  }.property('volume').cacheable(),


  play: function() {
    if(!this.playing) {
      this.set('currentStep', -1);
      this.set('playing', true);
      this._scheduleStepping();
    }
  },


  stop: function() {
    if(this.get('playing')) {
      clearInterval(this.scheduler);
      this.schedulerer = null;
      this.set('currentStep', -1);
      this.set('playing', false);
    }
  },


  toggle: function() {
    if(this.get('playing')) {
      this.stop();
    } else {
      this.play();
    }
  },


  step: function() {
    var step = (this.get('currentStep')+1) % DS.STEP_COUNT;
    this.set('currentStep', step);
    this.pattern.tracks.forEach(function(track) {
      track.steps[step].trigger();
    });
    if(this._bpmChanged) this._scheduleStepping();
  },


  _scheduleStepping: function() {
    if(this.scheduler) clearInterval(this.scheduler);
    var self = this;
    this.scheduler = setInterval(function(){self.step()}, this.get('period')/4);
    // we divide period by 4 to make each step 1/4 of a beat
    this._bpmChanged = false;
  },
  
  setBpm: function(event) {
    var bpm = event.target.value;
    if(bpm < DS.MIN_BPM) bpm = DS.MIN_BPM;
    if(bpm > DS.MAX_BPM) bpm = DS.MAX_BPM;
    this.setProperties({
      'bpm': bpm,
      '_bpmChanged': true
    });
  },

  setVolumePercentage: function(event) {
    var volume = event.target.value / 100;
    if(volume < 0) volume = 0;
    if(volume > 100) volume = 100;
    this.set('volume', volume);
  }
});

