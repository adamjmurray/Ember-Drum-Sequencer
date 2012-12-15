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
  },

  // serialize the state of the steps' isActive as a hexadecimal string
  serialize: function() {
    var steps = this.get('steps');
    var binary = steps.map(function(step){ return step.get('isActive') ? '1' : '0'; }).join('');      
    var hexadecimal = parseInt(binary,2).toString(16);          
    var len = this.get('serializedLength');
    while(hexadecimal.length < len) hexadecimal = '0'+hexadecimal;
    return hexadecimal;
  },

  // set steps' isActive from a serialized hexadecimal string
  deserialize: function(hexadecimal) {
    var steps = this.get('steps');
    var binary = parseInt(hexadecimal,16).toString(2);
    while(binary.length < DS.STEP_COUNT) binary = '0'+binary;
    //console.log(binary)
    
    steps.forEach(function(step,index) {
      //console.log("setting step " + index + " to " + (binary.charAt(index) === '1'))
      step.set('isActive', binary.charAt(index) === '1');
    });    
  },

  // the number of hexadecimal digits needed to represent the on/off state of all steps in a track
  serializedLength: function() {    
    return Math.ceil( Math.log(DS.STEP_COUNT)/Math.log(2) );
  }.property('DS.STEP_COUNT')
});
