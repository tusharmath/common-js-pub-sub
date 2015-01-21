'use strict';

module.exports = function() { 
 
    var topics = {};

    function subscribe(topic, listener) {
        // Create the topic's object if not yet created
        if (!topics[topic]) {
            topics[topic] = {
                queue: []
            };
        }

        // Add the listener to queue
        var index = topics[topic].queue.push(listener) -1;

        // Provide handle back for removal of topic
        return {
            remove: function() {
                delete topics[topic].queue[index];
            }
        };
    }

    function publish(topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!topics[topic] || !topics[topic].queue.length) {
            return;
        }

        // Cycle through topics queue, fire!
        var items = topics[topic].queue;
        items.forEach(function(item) {
            item(info || {});
        });
    }

    return {
        subscribe: subscribe,
        publish: publish
    };
}