module.exports = {
  "__version": "3.1.0",
  "notification": {
    "static data display": {
      "connection": {
        "can show friend request": {
          "1": "<span id=\"tabSelector_connection\">friends<span class=\"text-danger\"> (1)</span></span>"
        }
      },
      "my post": {
        "can show request": {
          "master": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (1)</span></span>",
          "request": "<span id=\"tabSelector_outPost_waitingList\">waiting list<span class=\"text-danger\"> (1)</span></span>"
        },
        "can show unaware return": {
          "master": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (1)</span></span>",
          "return": "<span id=\"tabSelector_outPost_returnNote\">return<span class=\"text-danger\"> (1)</span></span>"
        },
        "can show combine request and unaware return": {
          "master": "<span id=\"tabSelector_outPost\">my posts<span class=\"text-danger\"> (2)</span></span>",
          "request": "<span id=\"tabSelector_outPost_waitingList\">waiting list<span class=\"text-danger\"> (1)</span></span>",
          "return": "<span id=\"tabSelector_outPost_returnNote\">return<span class=\"text-danger\"> (1)</span></span>"
        }
      },
      "friend post": {
        "can show approve post": {
          "master": "<span id=\"tabSelector_inPost\">friend posts<span class=\"text-danger\"> (1)</span></span>",
          "approve": "<span id=\"tabSelector_inPost_approve\">approve<span class=\"text-danger\"> (1)</span></span>"
        }
      }
    }
  }
}
