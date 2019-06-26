const log = require('logger3');
const { format, color } = log;
 
const bracketTime = format.bracket(format.time);
 
module.exports.info = log.make(color.blue).prefix('[INFO] ').prefix(bracketTime);
module.exports.warn = log.make(color.yellow).prefix('[WARN] ').prefix(bracketTime);
module.exports.error = log.make(color.red).prefix('[ERROR]').prefix(bracketTime);
