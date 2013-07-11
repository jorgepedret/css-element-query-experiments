var App = {};
/*
 * Post Component
 */
App.Post = Backbone.Component.extend({
  /*
   * Here we can define the dimensions where we want to change the
   * functionality of our component.
   */
  uiModes: {
    /*
     * 'postSm' is the component's function that will get executed when the
     * component's width is under 480px
     */
    "postSm": {
      "max-width": "480px"
    },
    /*
     * 'postMd' is the component's function that will get executed when the
     * component's width is over 481px and under 768px
     */
    "postMd": {
      "min-width": "481px",
      "max-width": "768px"
    },
    /*
     * 'postLg' is the component's function that will get executed when the
     * component's width is over 769px
     */
    "postLg": {
      "min-width": "769px"
    }
  },
  initialize: function () {
    /*
     * Initializes the resize events for this component
     */
    this.createResizeEvents();
    /*
     * clear:uiModes event gets triggered when a new condition is met.
     * i.e.: Whenever it changes from postSm to postMd this event is triggered
     * I'm using it here to reset the component to its default state.
     */
    this.on("clear:uiModes", this.clearUiMode, this);
  },
  clearUiMode: function () {
    this.$el.removeClass("post--med post--large");
  },
  postSm: function () {
    // Add functionality here for when component is small
  },
  /*
   * Here you can add visual and behaviour changes to your component
   * In this case, I'm only adding a class name which changes the way it looks
   */
  postMd: function () {
    // Add functionality here for when component is med
    this.$el.addClass("post--med");
  },
  postLg: function () {
    // Add functionality here for when component is large
    this.$el.addClass("post--large");
  }
});

$.resize.delay = 100;

$(function () {
  /*
   * Take each .post in the DOM and create a Post Component with it.
   */
  $(".post").each(function () {
    var post = new App.Post({ el: $(this) });
  });
});