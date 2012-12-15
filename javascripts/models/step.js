/**
 * A single step in the drum sequencer, which can trigger an audio sample.
 */
DS.Step = Ember.Object.extend({

  sample: null,

  active: false,


  toggle: function() {
    this.set('active', !this.get('active'));
  },

  trigger: function() {
    if(this.get('active')) {
      this.get('sample').play();
    }
  }

});
