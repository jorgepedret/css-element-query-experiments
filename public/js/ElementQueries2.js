(function (window, undefined) {

  function addResizeListener(element, callback) {
    if (window.OverflowEvent){
      //webkit
      element.addEventListener('overflowchanged', function (e) {
        callback.call(this, e);
      });
    } else {
      element.addEventListener('overflow', function (e) {
        callback.call(this, e);
      });
      element.addEventListener('underflow', function (e) {
        callback.call(this, e);
      });
    }
  }

  var QueryElement = function (selector) {
    this.elements = document.querySelectorAll(selector);
    this.addRule = function (operator, size, rules) {
      console.log("when width ", operator, size, "then", rules);

    }
  }
  
  var processRule = function (rule) {
    var selector = rule.selectorText || "",
        operator, size, pieces, number, fullRule, queryEl,
        regex = /\[(width="(=|>=|<=|>|<){1}(\w)*")\]/ig;
    if (regex.test(selector)) {
      fullRule = selector.match(regex)[0];
      pieces = selector.split('"');
      number = pieces[1];
      operator = number.split(/\d/)[0];
      size = number.replace(operator, "");
      selector = selector.replace(fullRule,"");
      
      queryEl = new QueryElement(selector);
      queryEl.addRule(operator, size, rule.style);
    }
  }

  var processRules = function (rules) {
    for (var i in rules) {
      processRule(rules[i]);
    }
  }

  var init = function () {
    var rules = [],
        sheets;
    for (var i = 0, j = document.styleSheets.length; i < j; i++) {
      sheets = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
      console.log(sheets);
      for (var x in sheets) {
        if (sheets[x] instanceof CSSStyleRule) {
          rules.push(sheets[x]);
        }
      }
    }
    // processRules(rules);
  }

  if (window.addEventListener){
      window.addEventListener('load',init,false);
  } else {
      window.attachEvent('onload',init);
  }

})(window);