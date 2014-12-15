// requireJS module for handling event notifications between tasks
define([], function () {
  //"use strict";
  var my = {
    },
    eventHandlers = {};

  my.addListener = function(eventname,func) {
    if (typeof eventHandlers[eventname] === "undefined") { // create
      eventHandlers[eventname] = [];
    }
    eventHandlers[eventname].push(func);
  };
  
  my.removeListener = function (eventname, func) {
    if (typeof eventHandlers[eventname] === "undefined") return false;
    for(var i=0;i<eventHandlers[eventname].length;i++) {
      if (eventHandlers[eventname][i] === func) {
        eventHandlers[eventname].splice( i, 1 );
        return true;
      }
    }
    return false;
  };
  
  my.notifyListeners = function(eventnames) { // space separated list of events to call, any additional parameters are passed to each listener
    var eventname,
        events = eventnames.split(/\s+/);
    for(var e=0;e<events.length;e++) {
      eventname = events[e];
      if (typeof eventHandlers[eventname] !== "undefined") {
        var o = Array.prototype.slice.call(arguments, 1);
        for(var i=0;i<eventHandlers[eventname].length;i++) {
          eventHandlers[eventname][i].apply(my,o); // notify event handler
        }
      }
    }
  };

  return my;  // return public interface
});
