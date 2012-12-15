DS.TrackView = Ember.View.extend({

  template: Ember.Handlebars.compile('{{name}}<ol>{{#each steps}}{{view DS.StepView}}{{/each}}</ol>'),

  tagName: 'li',

  classNames: ['track']

});