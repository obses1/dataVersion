import log from 'loglevel'

const LOG_PREFIX = '[DataVue]'

const level = import.meta.env.VITE_LOG_LEVEL || 'info'
log.setLevel(level as log.LogLevelDesc)

function formatMessage(level: string, msg: string): string {
  const time = new Date().toLocaleTimeString()
  return `${LOG_PREFIX}[${level}][${time}] ${msg}`
}

const logger = {
  trace: (msg: string, ...args: unknown[]) => log.trace(formatMessage('TRACE', msg), ...args),
  debug: (msg: string, ...args: unknown[]) => log.debug(formatMessage('DEBUG', msg), ...args),
  info: (msg: string, ...args: unknown[]) => log.info(formatMessage('INFO', msg), ...args),
  warn: (msg: string, ...args: unknown[]) => log.warn(formatMessage('WARN', msg), ...args),
  error: (msg: string, ...args: unknown[]) => {
    log.error(formatMessage('ERROR', msg), ...args)
    console.trace('Stack trace:')
  },
}

export default logger
