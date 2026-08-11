import type { HlsConfig } from 'hls.js';

const config: Partial<HlsConfig> = {
  debug: true,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferSize: 60 * 1024 * 1024,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: 10,
  manifestLoadingTimeOut: 20000,
  manifestLoadingMaxRetry: 5,
  manifestLoadingRetryDelay: 1000,

  levelLoadingTimeOut: 20000,
  levelLoadingMaxRetry: 5,
  levelLoadingRetryDelay: 1000,

  fragLoadingTimeOut: 20000,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 1000,
  enableWorker: true,
  lowLatencyMode: false
};

export default config;