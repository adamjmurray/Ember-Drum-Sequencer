/**
 * The pattern view displays the list of tracks,
 * and manages the "highlight bar" that travels over the pattern grid to indicate the current step.
 */
DS.PatternView = Ember.View.extend({

  templateName: 'pattern',

  classNames: ['pattern'],

  pattern: null,


  highlightStyle: function() {
    var visibility = 'hidden';
    var offset = 0;
    var isPlaying = this.get('controller.isPlaying');
    var stepIndex = this.get('controller.currentStepIndex');
    
    if(isPlaying && stepIndex >= 0) {
      var $currentStepView = this.$('.track:first .step:nth(' + stepIndex + ')');
      if($currentStepView.length) {
        visibility = 'visible';
        offset = $currentStepView.position().left - 5;
      }
    }

    return 'left:'+offset+'px;visibility:'+visibility+';';
  }.property('controller.isPlaying', 'controller.currentStepIndex')

});