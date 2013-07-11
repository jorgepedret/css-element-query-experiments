/*
 * Backbone Component
 *
 * This is a quick Backbone extension I created to abstract some
 * functionality from defining the UI Modes and automatically trigger
 * events when stuff changes.
 *
 */
Backbone.Component = Backbone.View.extend({
  /*
   * Flag that holds the current UI mode
   */
  currentUiMode: null,
  /*
   * Flag that tells us if there are UI modes defined
   */
  hasUiModes: false,
  /*
   * Holder of the UI modes configuration
   */
  uiModes: {},
  /*
   * Initializes the resize events that get triggered when UI modes
   * conditions are met
   */
  createResizeEvents: function () {
    var self = this;
    if (Object.keys(self.uiModes).length) {
      self.hasUiModes = true;
    }
    if (self.hasUiModes && self.$el.length) {
      /*
       * This adds a listener that gets triggered whenever the element
       * gets resized. Depends on Ben Alman's resize plugin
       * http://benalman.com/projects/jquery-resize-plugin/
       */
      self.$el.resize(function () {
        /*
         * Pass the element's outerwidth and outerhight to our resize
         * handler function
         */
        self.handleResize($(this).outerWidth(), $(this).outerHeight());
      });
    }
    /*
     * Manually trigger the resize event in the element when it's initialized
     * That way any rules that meet the conditions get applied
     */
    self.$el.trigger('resize');
  },
  /*
   * Handle resize function
   */
  handleResize: function (width, height) {
    this.findUiModeMatch(width, height);
  },
  /*
   * Tries to find if the component meets any of the UI mode conditions
   */
  findUiModeMatch: function (width, height) {
    var i = null,
        itMatches,
        match,
        self = this,
        minWidth, maxWidth;
    /*
     * Go through each on of the UI modes and check if a condition is met.
     * When it finds a condition that matches is executes handleUiMode with
     * the UI mode that matched
     */
    for(i in this.uiModes) {
      if (this.uiModes[i].hasOwnProperty("max-width") && this.uiModes[i].hasOwnProperty("min-width")) {
        minWidth = self._removeUnits(this.uiModes[i]["min-width"]);
        maxWidth = self._removeUnits(this.uiModes[i]["max-width"]);
        if (width >= minWidth && width <= maxWidth) {
          self.handleUiMode(i);
        }
      } else if (this.uiModes[i].hasOwnProperty("max-width")) {
        maxWidth = self._removeUnits(this.uiModes[i]["max-width"]);
        if (width <= maxWidth) {
          self.handleUiMode(i);
        }
      } else if (this.uiModes[i].hasOwnProperty("min-width")) {
        minWidth = self._removeUnits(this.uiModes[i]["min-width"]);
        if (width >= minWidth) {
          self.handleUiMode(i);
        }
      }
    }
  },
  /*
   * Applies a new UI mode, if it's not already applied
   */
  handleUiMode: function (mode) {
    if (this.currentUiMode !== mode) {
      /*
       * Change the current mode flag to the new mode
       */
      this.currentUiMode = mode;
      /*
       * Trigger an event saying that a new UI mode has been applied
       */
      this.trigger("clear:uiModes", mode);
      /*
       * Execute the function associated with that UI mode (if it's defined)
       */
      if (typeof this[mode] === "function") {
        this[mode].call(this, null);
      }
    }
  },
  _removeUnits: function (numberWithUnits) {
    return numberWithUnits.replace("px", "")*1;
  }
});