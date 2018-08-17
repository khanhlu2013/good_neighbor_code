module.exports = {
  "__version": "3.0.3",
  "My first test": {
    "Profile component": {
      "-> FindByEmail: can do simple search - without modify connections": {
        "Login page": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div><a href=\"http://localhost:3001/auth/google\">Login with Google</a>\n        <div>\n          <form><input id=\"dummy_login_email\"\n              type=\"text\"\n              placeholder=\"email\"\n              value=\"\"><input id=\"dummy_login_name\"\n              type=\"text\"\n              placeholder=\"name\"\n              value=\"\"><input type=\"submit\"\n              value=\"Dummy Login\"></form>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Profile page": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\"></div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Invalid search: empty email": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <p>Search text is empty!</p>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Invalid search: invalid email": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"xyz\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <p>Email is invalid!</p>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Invalid search: self search email": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"lu@us.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <p>Can't add yourself as friend</p>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Valid search: email not found": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"abc@efg.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <p>result not found</p>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Valid search: email found": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"tu@pr.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Tu Nguyen, email: tu@pr.com</p>\n              <p><button id=\"createConnectionBtn\">Invite Tu Nguyen</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>"
      },
      "-> FindByEmail: can modify connection": {
        "Created connection": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"tu@pr.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Tu Nguyen, email: tu@pr.com</p>\n              <p>You invited Tu Nguyen. Please wait for approval!<button id=\"denyConnectionByFromBtn\">Undo invite</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Tu Nguyen</td>\n              <td><button>undo</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "DenyConnectionByFrom": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"tu@pr.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Tu Nguyen, email: tu@pr.com</p>\n              <p>You invited Tu Nguyen. But you changed your mind.<button id=\"approveConnectionByFromBtn\">Undo</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "ApproveConnectionByFrom": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"tu@pr.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Tu Nguyen, email: tu@pr.com</p>\n              <p>You invited Tu Nguyen. Please wait for approval!<button id=\"denyConnectionByFromBtn\">Undo invite</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Tu Nguyen</td>\n              <td><button>undo</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "Searched incomming connection": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Tu Nguyen - tu@pr.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"lu@us.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Lu Tran, email: lu@us.com</p>\n              <p>Lu Tran invited you. <span><button id=\"approveConnectionByToFirstTimeBtn\">approve</button><button id=\"denyConnectionByToFirstTimeBtn\">deny</button></span></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Lu Tran</td>\n              <td><button>approve</button></td>\n              <td><button>deny</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "ApproveConnectionByToFirstTime": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Tu Nguyen - tu@pr.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"lu@us.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Lu Tran, email: lu@us.com</p>\n              <p>Lu Tran invited you. And you accpected!<button id=\"denyConnectionByToSecondTimeBtn\">undo</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Lu Tran</td>\n              <td><button>remove</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "DenyConnectionByToSecondTime": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Tu Nguyen - tu@pr.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"lu@us.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Lu Tran, email: lu@us.com</p>\n              <p>Lu Tran invited you. And you denied.<button id=\"approveConnectionByToSecondTimeBtn\">undo</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Lu Tran</td>\n              <td><button>undo</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "ApproveConnectionByToSecondTime": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Tu Nguyen - tu@pr.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"lu@us.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Lu Tran, email: lu@us.com</p>\n              <p>Lu Tran invited you. And you accpected!<button id=\"denyConnectionByToSecondTimeBtn\">undo</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 1 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Lu Tran</td>\n              <td><button>remove</button></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>",
        "SeachDenyByTo": "<body>\n  <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n  <div id=\"root\">\n    <div class=\"App\">\n      <h1>Welcome to Good Neighboors</h1>\n      <div id=\"Profile-react\">\n        <div>Profile: Lu Tran - lu@us.com<a href=\"http://localhost:3001/profile/logout\">logout</a></div>\n        <div\n        id=\"FindByEmail-react\">\n          <form><input type=\"text\"\n              placeholder=\"by email\"\n              value=\"tu@pr.com\"><input type=\"submit\"\n              value=\"Search\"></form>\n          <div id=\"SearchResult-react\">\n            <div>\n              <p>Found Tu Nguyen, email: tu@pr.com</p>\n              <p>You invited Tu Nguyen. But sorry, you got denied!<button id=\"denyConnectionByFromBtn\">Undo invite</button></p>\n            </div>\n          </div>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Friends: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>remove</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Incomming invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>approve</th>\n              <th>deny</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Outgoing invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n      <div id=\"ConnectionTable-react\">\n        <table>\n          <caption>Denied invite: 0 count</caption>\n          <thead>\n            <tr>\n              <th>name</th>\n              <th>undo</th>\n            </tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n  </div>\n  <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  <script type=\"text/javascript\"\n    src=\"/static/js/bundle.js\"></script>\n\n</body>"
      }
    }
  }
}
