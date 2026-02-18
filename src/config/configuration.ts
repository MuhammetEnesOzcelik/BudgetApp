import { IConfiguration } from './configuration.interface';

// TODO: Config validation with joi

export default (): IConfiguration => {
  return {
    appEnv: process.env.APP_ENV!,
    appDomain: process.env.APP_DOMAIN!,
    appPort: Number(process.env.APP_PORT!),
    mongoDb: {
      uri: process.env.MONGODB_URI!,
    },
    jwt: {
      accessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY!,
      accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
      refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY!,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
    },
  };
};
