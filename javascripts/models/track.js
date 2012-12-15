/**
 * A collection of Steps.
 */
DS.Track = Ember.Object.extend({

  name: '',

  steps: null,


  init: function() {
    var name = this.get('name');
    var steps = [];
    for(var i=0; i<DS.STEP_COUNT; i++) {
      var step = DS.Step.create({
        sample: DS.Sample.create({name: name}) // load a separate copy of the same for each step, to avoid cutting off sounds...
      });
      steps.push(step);
    }
    this.set('steps', steps);    
  }

});
