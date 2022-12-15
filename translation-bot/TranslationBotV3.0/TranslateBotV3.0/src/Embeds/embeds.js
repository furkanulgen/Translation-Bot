const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b),
});
const settings = require("../../settings.json");

module.exports.help = (message) => {
  message.delete();
  const help = new MessageEmbed()
    .setAuthor({
      name: `${message.author.tag} Help !`,
      iconURL: `${message.author.displayAvatarURL()}`,
    })
    .addFields(
      { name: "Step One", value: "Language selection", inline: false },
      { name: "Step Two", value: "Use", inline: false },
      {
        name: "Step One Example",
        value: "```Command => +update de```",
        inline: false,
      },
      {
        name: "Step Two Example",
        value: "```Command => +thank you \nResult => Danke```",
        inline: false,
      }
    )
    .setColor(settings.color)
    .setThumbnail(settings.logo);
  message.author.send({ embeds: [help] });
};

module.exports.language = (message) => {
  message.delete();
  const language = new MessageEmbed()
    .setAuthor({
      name: `${message.author.tag} Language !`,
      iconURL: `${message.author.displayAvatarURL()}`,
    })
    .setDescription(
      "+update af (Afrikaans)\n+update sq (Albanian)\n+update ar (Arabic)\n+update hy (Armenian)\n+update az (Azerbaijani)\n+update eu (Basque)\n+update be (Belarusian)\n+update bn (Bengali)\n+update bs (Bosnian)\n+update bg (Bulgarian)\n+update ca (Catalan)\n+update ceb (Cebuano)\n+update ny (Chichewa)\n+update zh-cn (Chinese Simplified)\n+update zh-tw (Chinese Traditional)\n+update co (Corsican)\n+update hr (Croatian)\n+update cs (Czech)\n+update da (Danish)\n+update nl (Dutch)\n+update en (English)\n+update eo (Esperanto)\n+update et (Estonian)\n+update tl (Filipino)\n+update fi (Finnish)\n+update fr (French)\n+update fy (Frisian)\n+update gl (Galician)\n+update ka (Georgian)\n+update de (German)\n+update el (Greek)\n+update gu (Gujarati)\n+update ht (Haitian Creole)\n+update ha (Hausa)\n+update haw (Hawaiian)\n+update iw (Hebrew)\n+update hi (Hindi)\n+update hmn (Hmong)\n+update hu (Hungarian)\n+update is (Icelandic)\n+update if (Igbo)\n+update id (Indonesian)\n+update ga (Irish)\n+update it (Italian)\n+update ja (Japanese)\n+update jw (Javanese)\n+update kn (Kannada)\n+update kk (Kazakh)\n+update km (Khmer)\n+update lat (Latvian)\n+update ko (Korean)\n+update ku (Kurdish (Kurmanji))\n+update ky (Kyrgyz)\n+update lo (Lao)\n+update la (Latin)\n+update lv (Latvian)\n+update lt (Lithuanian)\n+update lb (Luxembourgish)\n+update lb (Luxembourgish)\n+update mk (Macedonian)\n+update mg (Malagasy)\n+update ms (Malay)\n+update ml (Malayalam)\n+update mt (Maltese)\n+update mi (Maori)\n+update mr (Marathi)\n+update mn (Mongolian)\n+update my (Myanmar (Burmese))\n+update ne (Nepali)\n+update no (Norwegian)\n+update ps (Pashto)\n+update fa (Persian)\n+update pl (Polish)\n+update pt (Portuguese)\n+update ma (Punjabi)\n+update ro (Romanian)\n+update ru (Russian)\n+update sm (Samoan)\n+update gd (Scots Gaelic)\n+update sr (Serbian)\n+update st (Sesotho)\n+update sn (Shona)\n+update sd (Sindhi)\n+update si (Sinhala)\n+update sk (Slovak)\n+update sl (Slovenian)\n+update so (Somali)\n+update es (Spanish)\n+update su (Sudanese)\n+update sw (Swahili)\n+update sv (Swedish)\n+update tg (Tajik)\n+update ta (Tajik)\n+update te (Telugu)\n+update th (Thai)\n+update tr (Turkish)\n+update uk (Ukrainian)\n+update ur (Urdu)\n+update uz (Uzbek)\n+update vi (Vietnamese)\n+update cy (Welsh)\n+update xh (Xhosa)\n+update yi (Yiddish)\n+update yo (Yoruba)\n+update zu (Zulu)"
    )
    .setColor(settings.color)
    .setThumbnail(settings.logo);
  message.author.send({ embeds: [language] });
  const helpInfo = new MessageEmbed()
    .setAuthor({
      name: `${message.author.tag} Language !`,
      iconURL: `${message.author.displayAvatarURL()}`,
    })
    .setDescription("Sent You at DM")
    .setColor(settings.color)
    .setThumbnail(settings.logo);
  message.channel.send({ embeds: [helpInfo] });
};

module.exports.info = (message) => {
  message.delete();
  const help = new MessageEmbed()
    .setAuthor({
      name: `${message.author.tag} Information !`,
      iconURL: `${message.author.displayAvatarURL()}`,
    })
    .addFields(
      { name: "HELP !", value: "```Command => +help```", inline: false },
      {
        name: "Languages ​​you can choose",
        value: "```Command => +language```",
        inline: false,
      },
      {
        name: "About Us",
        value: "```This Bot was programmed by one person in 5 months```",
        inline: false,
      },
      { name: "Owner, Founder", value: "```narr0w#5737```", inline: false }
    )
    .setColor(settings.color)
    .setThumbnail(settings.logo);
  message.author.send({ embeds: [help] });
};
