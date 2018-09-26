module.exports = {
  "__version": "3.1.0",
  "notification dynamic update ui LoadingIcon": {
    "connection": {
      "can update friend request ": {
        "before": "<span id=\"tabSelector_connection\">friends<span class=\"text-danger\"> (1)</span></span>",
        "after": "<span id=\"tabSelector_connection\">friends<span id=\"LoadingIcon-react\"><b>·..</b></span></span>"
      }
    },
    "outPost": {
      "can update request": {
        "before": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (1)</span></span>",
        "after": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (1)</span></span>"
      },
      "can update unaware return": {
        "before": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (1)</span></span>",
        "after": "<span id=\"tabSelector_outPost\">my posts<span id=\"LoadingIcon-react\"><b>·..</b></span></span>"
      }
    },
    "inPost": {
      "can update approve post": {
        "before": "<span id=\"tabSelector_inPost\">friend posts<span class=\"text-danger\"> (1)</span></span>",
        "after": "<span id=\"tabSelector_inPost\">friend posts<span id=\"LoadingIcon-react\"><b>·..</b></span></span>"
      }
    }
  }
}
