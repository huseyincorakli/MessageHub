const oc = require("octokit");
const fs = require('fs');
require("dotenv").config();
const checkForPublic = require('./checkForPublic')

const octokit = new oc.Octokit({
  auth: process.env.GITHUB_AUTH,
});


const getGithubData = async () => {
    const githubData = await octokit.request("GET /user/repos");
    const path='githubdata.json'
    fs.readFile(path,'utf-8',(err,data)=>{
      if (err) {
         console.log('error!')
      }
       const datax =  checkForPublic(githubData.data)
      try {
        console.log(data);
          if (data) {
              data=null
          }
          if (!data) {
            const datas=JSON.stringify(datax, null, 2)
              fs.writeFile(path, datas, (err) => {
                  if (err) {
                    console.error('Dosya oluşturma hatası:', err);
                    return;
                  }
                  console.log('JSON verileri dosyaya başarıyla eklendi.');
                });
          }
      } catch (error) {
          console.log('error2!');
      }
    });
  
    
  };

  module.exports=getGithubData;
