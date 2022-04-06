export interface PostgresConfig extends Object {
  name: string;
  connector: string;
  url?: string;
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
}

export type RabbitmqConfig = {
  protocol: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
};
