const cheerio = require('cheerio');

const htmlMock = `
<table class="wikitable">
  <tr>
    <th>N.</th> <th>Nombre</th> <th>Premios</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Gloria Estefan</td>
    <td>
       <b style="color:silver">G</b>
       <span style="color: gold;">G</span>
    </td>
  </tr>
</table>
`;

const $ = cheerio.load(htmlMock);
const cells = $('td');
cells.each((_, el) => {
    const silver = $(el).find("[style*='color:silver'], [style*='color: silver']").filter((i, elG) => $(elG).text().includes('G')).length > 0;
    const gold = $(el).find("[style*='color:gold'], [style*='color: gold']").filter((i, elG) => $(elG).text().includes('G')).length > 0;
    if (silver || gold) {
        console.log('Found seagulls in cell: ', silver, gold);
    }
});
