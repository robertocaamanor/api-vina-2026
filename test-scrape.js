const cheerio = require('cheerio');
fetch('https://es.wikipedia.org/wiki/LXV_Festival_Internacional_de_la_Canci%C3%B3n_de_Vi%C3%B1a_del_Mar')
    .then(r => r.text())
    .then(html => {
        const $ = cheerio.load(html);
        let output = '';
        $('table.wikitable').each((_, el) => {
            output += $(el).text() + '\n---\n';
        });
        console.log(output.substring(0, 1000));
    });
