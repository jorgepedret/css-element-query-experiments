var App = {};

$.resize.delay = 250;

Backbone.Component = Backbone.View.extend({
  currentUiMode: null,
  hasUiModes: false,
  uiModes: {},
  createResizeEvents: function () {
    var self = this;
    if (Object.keys(self.uiModes).length) {
      self.hasUiModes = true;
    }
    if (self.hasUiModes && self.$el.length) {
      self.$el.resize(function () {
        self.handleResize($(this).outerWidth(), $(this).outerHeight());
      });
    }
    self.$el.trigger('resize');
  },
  handleUiMode: function (mode) {
    if (this.currentUiMode !== mode) {
      this.currentUiMode = mode;
      this.trigger("clear:uiModes");
      if (typeof this[mode] === "function") {
        this[mode].call(this, null);
      }
    }
  },
  _removeUnits: function (numberWithUnits) {
    return numberWithUnits.replace("px", "")*1;
  },
  findUiModeMatch: function (width, height) {
    var i = null,
        itMatches,
        match,
        self = this,
        minWidth, maxWidth;
    
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
  handleResize: function (width, height) {
    this.findUiModeMatch(width, height);
  }
});

App.Post = Backbone.Component.extend({
  uiModes: {
    "postSm": {
      "max-width": "480px"
    },
    "postMd": {
      "min-width": "481px",
      "max-width": "768px"
    },
    "postLg": {
      "min-width": "769px"
    }
  },
  initialize: function () {
    this.createResizeEvents();
    this.on("clear:uiModes", this.clearUiMode, this);
  },
  clearUiMode: function () {
    this.$el.removeClass("post--med post--large");
  },
  postSm: function () {
    // Add functionality here for when component is small
  },
  postMd: function () {
    this.$el.removeClass("post--large").addClass("post--med");
    // Add functionality here for when component is med
  },
  postLg: function () {
    this.$el.removeClass("post--med").addClass("post--large");
    // Add functionality here for when component is large
  }
});

$(function () {
  $(".post").each(function () {
    var post = new App.Post({ el: $(this) });
  });
});