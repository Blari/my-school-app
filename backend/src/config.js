const os = require('os');

const config = {
  gcloud: {
    bucket: 'fldemo-files',
    hash: '6f7461de9e98a162e71e1fde9b2bb984',
  },
  bcrypt: {
    saltRounds: 12,
  },
  admin_pass: 'password',
  admin_email: 'admin@flatlogic.com',
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft',
  },
  secret_key: 'HUEyqESqgQ1yTwzVlO6wprC9Kf1J1xuA',
  remote: process.env.REMOTE_URL || '',
  port: process.env.NODE_ENV === 'production' ? process.env.PORT || '80' : '8080',
  hostUI: process.env.NODE_ENV === 'production' ? process.env.HOST_UI || '' : 'http://localhost',
  portUI: process.env.NODE_ENV === 'production' ? process.env.PORT_UI || '80' : '3000',

  swaggerUI: process.env.NODE_ENV === 'production' ? process.env.SWAGGER_UI || '' : 'http://localhost',
  swaggerPort: process.env.NODE_ENV === 'production' ? process.env.SWAGGER_PORT || '80' : '8080',
  google: {
    clientId: '671001533244-kf1k1gmp6mnl0r030qmvdu6v36ghmim6.apps.googleusercontent.com',
    clientSecret: 'Yo4qbKZniqvojzUQ60iKlxqR',
  },
  microsoft: {
    clientId: '4696f457-31af-40de-897c-e00d7d4cff73',
    clientSecret: 'm8jzZ.5UpHF3=-dXzyxiZ4e[F8OF54@p',
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'school app <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: 'AKIAVEW7G4PQUBGM52OF',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  roles: {
    admin: 'Administrator',
    user: 'User',
  },

  project_uuid: '20b78f05-4e14-49d1-9fa4-ff2fe813ee6e',
  flHost: process.env.NODE_ENV === 'production' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',
};

config.host = process.env.NODE_ENV === 'production' ? config.remote : 'http://localhost';
config.apiUrl = `${config.host}:${config.port}/api`;
config.swaggerUrl = `${config.swaggerUI}:${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}:${config.portUI}/#/`;
config.backUrl = `${config.hostUI}:${config.portUI}/`;

module.exports = config;
