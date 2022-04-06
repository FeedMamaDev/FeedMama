const config = {
    authentication: {
      options: {
        userName: "admin@feedmama.org@feedmamaserver",
        password: "f33dmama777"
      },
      type: "default"
    },
    server: "feedmamaserver.database.windows.net",
    options: {
      database: "feeedmamadatabase",
      encrypt: true
    }
};
  
module.exports = config;