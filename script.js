'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Payroll-Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'askCase');
        }
    },

    askCase: {
      prompt:(bot) => bot.say('Say something - THING, WHATEVER, YO'),
      receive: (bot, message) => {
        const something = message.text;
        return bot.setProp('something', something)
          switch(something){
            case "THING":
              .then(() => bot.say('You said: ${something}'))
            case: "YO":
              .then(() => bot.say('Yo dawg'))
            default:
              .then(() => bot.say('Did not work'))
          }
      }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
