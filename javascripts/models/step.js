/**
 * A single step in the drum sequencer, which can trigger an audio sample.
 */
DS.Step = Ember.Object.extend({

  sample: null,

  isActive: false,


  toggle: function() {
    this.set('isActive', !this.get('isActive'));
  },

  trigger: function() {
    if(this.get('isActive')) {
      this.get('sample').play();
    }
  }

});
