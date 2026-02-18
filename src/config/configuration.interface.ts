export interface IConfiguration {
  appEnv: string;
  appDomain: string;
  appPort: number;
  mongoDb: IMongoDB;
  jwt: IJwt;
}

export interface IMongoDB {
  uri: string;
}

export interface IJwt {
  accessTokenSecretKey: string;
  refreshTokenSecretKey: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
