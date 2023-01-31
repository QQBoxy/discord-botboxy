require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    // {
    //     name: 'hi',
    //     description: 'Say Hello',
    // },
    // {
    //     name: 'options-info',
    //     description: 'Information about the options provided.',
    //     options: [
    //         {
    //             name: "input",
    //             description: "The input to echo back",
    //             type: 3,
    //         }
    //     ],
    // },
    {
        name: 'openai',
        description: 'OpenAI',
        options: [
            {
                name: "question",
                description: "Input question",
                type: 3,
            }
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();