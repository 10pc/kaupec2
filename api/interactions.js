require('dotenv').config();
const { SlashCreator, VercelServer } = require('slash-create');
const path = require('path');
const CatLoggr = require('cat-loggr');
const logger = new CatLoggr().setLevel(process.env.COMMANDS_DEBUG === 'true' ? 'debug' : 'info');

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
  serverPort: parseInt(process.env.PORT, 10) || 8020,
  serverHost: '0.0.0.0'
});

creator.on('debug', (message) => logger.log(message));
creator.on('warn', (message) => logger.warn(message));
creator.on('error', (error) => logger.error(error));
creator.on('synced', () => logger.info('Commands synced!'));
creator.on('commandRun', (command, _, ctx) =>
  logger.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`));
creator.on('commandRegister', (command) =>
  logger.info(`Registered command ${command.commandName}`));
creator.on('commandError', (command, error) => logger.error(`Command ${command.commandName}:`, error));

creator
  .withServer(new VercelServer())
  .registerCommandsIn(path.join(__dirname, 'commands'));

module.exports = creator.server.vercelEndpoint;

console.log(`${creator.server.vercelEndpoint}`);
