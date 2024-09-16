//For Reading Files
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
const app = express();
const port = 8000;
//import serverUrl from './config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import axios from 'axios';

app.use(express.json());
app.use(cors({origin: '*'}));

//app.use(express.static(path.resolve(__dirname, './dist')));

function getFiles() {
    const currentDir = __dirname; //'/home/yanarof/sparql_wp/';

    console.log('currentDir=', currentDir);
    const allEntries = fs.readdirSync(currentDir, { withFileTypes: true });
    const queryFolders = allEntries
      .filter(entry => entry.isDirectory() && entry.name.startsWith('queries_'))
      .map(entry => entry.name);
    console.log('queryFolders=', queryFolders);
    const myDict = {};
    queryFolders.forEach(folder => {
      const folderPath = path.join(currentDir, folder);
      const files = fs.readdirSync(folderPath);
      const queries_dict = {};
      files
        .filter(file => file.endsWith('.rq') || file.endsWith('.sparql'))
        .forEach(file => {
          const fileContent = fs.readFileSync(path.join(folderPath, file), 'utf8');
          const lines = fileContent.split('\n');
          const query_dict = {
            title: '',
            comment: '',
            query: '',
          };
          let current_section = '';
          for (let line of lines) {
            if (line.startsWith('#title')) {
              current_section = 'title';
              query_dict.title = line.slice(7).trim();
            } else if (line.startsWith('#comment')) {
              current_section = 'comment';
              query_dict.comment += line.slice(9) + '\n';
            } else {
              current_section = 'query';
              query_dict.query += line + '\n';
            }
          }
          queries_dict[file] = query_dict;
        });
      // Read conf.json from folder
      const confFile = files.find(file => file === 'config.json');
      let conf = {};
      if (confFile) {
        const confContent = fs.readFileSync(path.join(folderPath, confFile), 'utf8');
        //console.log('confContent=', confContent);
        conf = JSON.parse(confContent);
      }
      // Add the queries and conf to the myDict object
      const key = folder.replace('queries_', '');
      myDict[key] = { queries_dict, ...conf };
      //console.log('getFiles: queries_dict=', queries_dict);
    });
  //console.log('myDict[glyconnect]=', myDict['glyconnect']);
  return myDict;
}


app.get('/files', (req, res) => {
  console.log('in files');
  try {
    const myDict = getFiles();
    res.json(myDict);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading folders');
  }
});


app.post('/sendQuery', async (req, res) => {
  console.log('in sendQuery');
  try {
    console.log('sendQuery called', req.body);
    let { endpointName, queryString } = req.body;
    if (!queryString) {
      console.log('in sendQuery: ERROR=', 'Invalid queryString:', queryString);
      res.status(400).json({code: 400, message: 'Invalid query string:' + queryString });
      return;
    }

    const myDict = getFiles();
    if (!Object.keys(myDict).includes(endpointName)) {
      console.log('in sendQuery: ERROR=', 'Invalid endpoint endpointName.', endpointName);
      res.status(400).json({code: 400, message:'Invalid endpoint endpointName:' + endpointName });
      return;
    }


    const url = myDict[endpointName].url;

    /*const fullUrl = `${url}?query=${encodeURIComponent(queryString)}&format=json`;
    console.log('fullUrl=', fullUrl, '-----');
    const response = await axios.get(fullUrl);
    const jsonData = response.data;
    res.json(jsonData);*/

    const postData = {
      query: queryString,
      format: 'json',
    };
    const response = await axios.post(url, new URLSearchParams(postData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const jsonData = response.data;
    res.json(jsonData);

  } catch (error) {
    //console.log('Error while processing the query: in sendQuery: ERROR=', error.response.statusText)
    //if (!Object.keys(error.response).includes(statusText))
      //if statusText in error.response
    if(error.response && error.response.statusText)
      res.status(400).json({ code: 400, message: 'ERROR:'+error.response.statusText });
    else
      res.status(400).json({ code: 400, message: 'ERROR: while processing the query' });
    //res.json({ code: 400, message:error.response.statusText, head: { vars: [] }, results: { bindings: [] } });
  }

});

/*app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});*/

app.listen(port,() => {
    //console.log('Backend ServerUrl: ', serverUrl);
    console.log('Backend running on port: ', port);
});


