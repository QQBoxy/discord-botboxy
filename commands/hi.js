const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Say Hello'),
    async execute(interaction) {
        const { username } = interaction.user;
        await interaction.reply(`Hello, ${username} !`);
    },
};