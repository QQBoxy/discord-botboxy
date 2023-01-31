require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const Lodash = require('lodash');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('openai')
        .setDescription('OpenAI')
        .addStringOption(option => option
            .setName('question')
            .setRequired(true)
            .setDescription('Input question')
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString('question');
        const response = await axios({
            method: 'post',
            url: "https://api.openai.com/v1/completions",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_TOKEN}`
            },
            data: {
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.9,
                max_tokens: 2000
            }
        });
        const answer = Lodash.get(response, 'data.choices[0].text', '').substring(2);
        const result = `Q:${question}\nA:${answer}`;
        return interaction.editReply(result);
    },
};