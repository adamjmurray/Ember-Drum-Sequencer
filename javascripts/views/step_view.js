DS.StepView = Ember.View.extend({

  template: Ember.Handlebars.compile('<button></button>'),
    
  tagName: 'li',

  classNames: ['step'],

  classNameBindings: ['context.active'],

  click: function() {
    var step = this.get('context');
    step.toggle();    
  }

});