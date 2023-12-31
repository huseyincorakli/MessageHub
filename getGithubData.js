const oc = require("octokit");
const fs = require('fs');
require("dotenv").config();
const checkForPublic = require('./checkForPublic')

const octokit = new oc.Octokit({
  auth: process.env.GITHUB_AUTH,
});


const getGithubData = async () => {
  const githubData = await octokit.request("GET /user/repos");
  const path = 'githubdata.json';

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.log('Dosya okunurken bir hata oluştu:', err);
      return;
    }

    try {
      const datax = checkForPublic(githubData.data);

      if (data) {
        // Dosya verilerini sil
        fs.truncate(path, 0, (err) => {
          if (err) {
            console.error('Dosya temizleme hatası:', err);
            return;
          }

          // Yeni verileri dosyaya yaz
          const datas = JSON.stringify(datax, null, 2);
          fs.writeFile(path, datas, (err) => {
            if (err) {
              console.error('Dosya yazma hatası:', err);
              return;
            }
            console.log('Yeni JSON verileri dosyaya başarıyla eklendi.');
          });
        });
      } else {
        // Dosya boşsa, yeni verileri doğrudan dosyaya yaz
        const datas = JSON.stringify(datax, null, 2);
        fs.writeFile(path, datas, (err) => {
          if (err) {
            console.error('Dosya yazma hatası:', err);
            return;
          }
          console.log('JSON verileri dosyaya başarıyla eklendi.');
        });
      }
    } catch (error) {
      console.log('Hata oluştu:', error);
    }
  });
};

  module.exports=getGithubData;
