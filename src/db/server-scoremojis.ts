import { model, Schema } from 'mongoose';

import { Scoremoji } from '../commands/index.types';

type ServerConfig = { scoremojis: Scoremoji[] };

const serverConfigSchema = new Schema<ServerConfig>({
  scoremojis: { type: Array, required: true },
  _id: { type: String, required: true },
});

export const ServerConfigModel = model<ServerConfig>(
  'ServerConfig',
  serverConfigSchema
);
