module.exports = {
  apps: [{
    name: "none",
    script: 'server/server.js',
    args: '-p 8444',
    // node_args: ["env=local"]
  },
  {
    name: "frame",
    script: 'server/server.js',
    args: '-p 8445',
  },
  {
    name: "webgl",
    script: 'server/server.js',
    args: '-p 8446',
  }, {
    name: "chat0",
    script: 'server/server.js',
    args: '-p 8600',
    // node_args: ["env=local"]
  },
  {
    name: "profile-chat1",
    script: 'server/server.js',
    args: '-p 8601',
  },
  {
    name: "photo3d-chat2",
    script: 'server/server.js',
    args: '-p 8602',
  }]
};
