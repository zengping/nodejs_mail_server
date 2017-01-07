var handle = require("./requestHandlers");
var url = require("url");

function route(request, response) {
    var path = url.parse(request.url, true);
    var routes = path.pathname.split("/");
    if (routes[1] && routes[2] && handle[routes[1]] && handle[routes[1]][routes[2]]) {
        handle[routes[1]][routes[2]](request, response);
    } else {
        console.log("No request handler found for " + url);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;