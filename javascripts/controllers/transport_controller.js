/**
 * The Transport is the controller for the application.
 * It manages playback via a setInterval()-based scheduler, and controls playback-related state such as volume.
 */
DS.TransportController = Ember.Controller.extend({

  bpm: 120,

  volume: 0.25,

  isPlaying: false,

  currentStepIndex: -1,
  
  patternController: null,


  beatDuration: function() {
    return 60000/this.get('bpm');
  }.property('bpm').cacheable(),

  setBpm: function(event) {
    var bpm = event.target.value;
    if(bpm < DS.MIN_BPM) bpm = DS.MIN_BPM;
    if(bpm > DS.MAX_BPM) bpm = DS.MAX_BPM;
    this.set('bpm', bpm);
    this._bpmChanged = true;    
  },


  volumePercentage: function() {
    return Math.round( this.get('volume') * 100 );    
  }.property('volume').cacheable(),

  setVolumePercentage: function(event) {
    var volume = event.target.value / 100;
    if(volume < 0) volume = 0;
    if(volume > 1) volume = 1;
    this.set('volume', volume);
  },


  play: function() {
    if(!this.get('isPlaying')) {
      this.set('currentStepIndex', -1);
      this.set('isPlaying', true);
      this._scheduleStepping();
    }
  },

  stop: function() {
    if(this.get('isPlaying')) {
      clearInterval(this._scheduler);
      this._schedulerer = null;
      this.set('currentStepIndex', -1);
      this.set('isPlaying', false);
    }
  },

  toggle: function() {
    if(this.get('isPlaying')) {
      this.stop();
    } else {
      this.play();
    }
  },


  step: function() {
    var stepIndex = (this.get('currentStepIndex')+1) % DS.STEP_COUNT;
    this.set('currentStepIndex', stepIndex);
    this.get('patternController').playStep(stepIndex, this.get('volume'));
    if(this._bpmChanged) this._scheduleStepping();
  },


  _scheduleStepping: function() {
    if(this._scheduler) clearInterval(this._scheduler);
    
    var self = this;
    var duration = this.get('beatDuration')/4; // each step is 1/4 of a beat    
    this._scheduler = setInterval(function(){ self.step(); }, duration);
    
    this._bpmChanged = false;
  }
  
});
