import logger from '@/utils/logger'

export function useLogger(module: string) {
  function prefix(msg: string) {
    return `[${module}] ${msg}`
  }

  return {
    info: (msg: string, ...args: unknown[]) => logger.info(prefix(msg), ...args),
    warn: (msg: string, ...args: unknown[]) => logger.warn(prefix(msg), ...args),
    error: (msg: string, ...args: unknown[]) => logger.error(prefix(msg), ...args),
    debug: (msg: string, ...args: unknown[]) => logger.debug(prefix(msg), ...args),
  }
}
