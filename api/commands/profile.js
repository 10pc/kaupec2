const { SlashCommand, CommandOptionType } = require('slash-create');
const { got } = require('got-cjs');
const playmodes = {
    vn: {
      std: '0',
      taiko: '1',
      catch: '2',
      mania: '3',
    },
    rx: {
      std: '4',
      taiko: '5',
      catch: '6',
    },
    ap: {
      std: '8',
    },
  }
  
module.exports = class profileCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'profile',
      description: 'fetch profile',
      options: [{
        name: 'username',
        description: 'username or user id',
        type: CommandOptionType.STRING,
        required: true,
      }, {
        name: 'gamemode',
        description: 'gamemode',
        type: CommandOptionType.STRING,
        required: true,
        choices: [
          {name: 'standard', value: 'std'},
          {name: 'taiko', value: 'taiko'},
          {name: 'catch', value: 'catch'},
          {name: 'mania', value: 'mania'}
        ]
      }, {
        name: 'mode',
        description: 'mode',
        type: CommandOptionType.STRING,
        required: true,
        choices: [
          {name: 'vanilla', value: 'vn'},
          {name: 'relax', value: 'rx'},
          {name: 'autopilot', value: 'ap'}
        ]
      }]
    });
  }

  async run(ctx) {
    if (!playmodes[ctx.options.mode][ctx.options.gamemode]){
      return `Invalid playmode ${ctx.options.gamemode}+${ctx.options.mode}`
    }
    let response;
    response = await got({
      method: 'get',
      url: `https://kawata-stats.vercel.app/card?user=${ctx.options.username}&animations=false&type=png&gamemode=${ctx.options.gamemode}&mode=${ctx.options.mode}`,
    });
    console.log(`Registered `);
    return response;

  }
}