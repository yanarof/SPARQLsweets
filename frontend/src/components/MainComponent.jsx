//import { features } from "../constants";
//import { navLinks } from "../constants";
import styles, { layout } from "../style_light";
//import Button from "./Button";
import serverUrl from '../config.js';

import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/sparql';
import 'brace/theme/github';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';




const Button_start = ({ endpointName, queryString, setQueryResults, url }) => (
  <button
    type="button"
    className={`py-3 px-5 font-poppins font-medium text-[16px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-5 mb-5`}
    onClick={() => { runCurlCommand({ endpointName: endpointName, queryString: queryString, setQueryResults: setQueryResults, url: url}); } }
  >
    Run Query
  </button>
);


async function runCurlCommand_OLD({ endpointName, queryString, setQueryResults, url }) {
  console.log("runCurlCommand", endpointName, queryString, 'url=', url);
 //curl -X POST $url --data-urlencode 'query=SELECT * { ?s ?p ?o } LIMIT 10' --data-urlencode 'format=json'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        query: queryString,
        format: 'json',
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    setQueryResults(json);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



async function runCurlCommand({ endpointName, queryString, setQueryResults, url }) {
  console.log("runCurlCommand", endpointName, queryString, 'url=', url);
  //const queryStringString = 'SELECT * { ?asdf ?uio ?iou } LIMIT 5';
  //const name = "glyconnect";
  try {
    //axios.get(`${serverUrl}/files`)
    const response = await fetch(`${serverUrl}/backend/sendQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpointName, queryString }),
    });
    if (!response.ok) {
      //setQueryResults({ code:response.status, message:'Error fetching SPARQL results from server'});
      //throw new Error(`HTTP error ${response.status}`);
    }
    const result = await response.json();
    setQueryResults(result);
    console.log('runCurlCommand result=', result);
  } catch (error) {
    setQueryResults({'code': 400, 'message': 'Error fetching SPARQL results from server'});
    console.error('Error fetching SPARQL results:', error);
  }
}


async function runCurlCommand_CORS_doesntwork({ endpointName, queryString, setQueryResults, url }) {
  console.log("runCurlCommand", endpointName, queryString, 'url=', url);
 //curl -X POST $url --data-urlencode 'query=SELECT * { ?s ?p ?o } LIMIT 10' --data-urlencode 'format=json'
  try {

    //app.post('/sendQuery', async (req, res) => {
      console.log('in sendQuery');
      try {
        //console.log('sendQuery called', req.body);
        //let { endpointName, queryString } = req.body;
        if (!queryString) {
          console.log('in sendQuery: ERROR=', 'Invalid queryString:', queryString);
          //res.status(400).json({code: 400, message: 'Invalid query string:' + queryString });
          //return;
        }

        /*const myDict = getFiles();
        if (!Object.keys(myDict).includes(endpointName)) {
          console.log('in sendQuery: ERROR=', 'Invalid endpoint endpointName.', endpointName);
          res.status(400).json({code: 400, message:'Invalid endpoint endpointName:' + endpointName });
          return;
        }*/

        //const url = myDict[endpointName].url;
        const fullUrl = `${url}?query=${encodeURIComponent(queryString)}&format=json`;
        const response = await axios.get(fullUrl);
        const jsonData = response.data;
        //res.json(jsonData);
        console.log('in sendQuery: jsonData=', jsonData);
        setQueryResults(jsonData);
      } catch (error) {
        //console.log('Error while processing the query: in sendQuery: ERROR=', error.response.statusText)
        //if (!Object.keys(error.response).includes(statusText))
          //if statusText in error.response
        /*if(error.response && error.response.statusText)
          res.status(400).json({ code: 400, message: error.response.statusText });
        else
          res.status(400).json({ code: 400, message: 'Error while processing the query' });*/
        //res.json({ code: 400, message:error.response.statusText, head: { vars: [] }, results: { bindings: [] } });
      }
    //});

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}






class InputBox_sparql extends React.Component {
  render() {
    return (
      <AceEditor
        id="sparql-editor-id"
        name="sparql-editor"
        value={this.props.queryDict.query}
        onChange={this.props.onQueryTextChange}
        mode="sparql"
        theme="github"
        //editorProps={{ $blockScrolling: true }}
        width="100%"
        height="200px"
        className="rounded-[10px]"
        backgroundColor="rgba(99,99,99,0)"
        fontSize={15}
        minLines={20}
        maxLines={30}
      />
    );
  }
}


// Show the list of queries
function ShowQueries({ queries_dds, onQuerySelected, filterString }) {
  if (!queries_dds || Object.keys(queries_dds.queries_dict).length === 0) {
    return null;
  }
  const filterTerms = filterString.trim().split(/\s+/);

  //console.log("in ShowQueries: queries_dds=", queries_dds)
  const filteredQueries = Object.keys(queries_dds.queries_dict).filter((key) => {
    //console.log("in ShowQueries: key=", key);
    //const query = queries_dds[key];
    const { title, comment, query: queryString } = queries_dds.queries_dict[key];
    //console.log("in ShowQueries: title=", title, "comment=", comment, "queryString=", queryString)
    return (
      filterTerms.length === 0 ||
      filterTerms.every((term) => title.includes(term) || comment.includes(term) || queryString.includes(term))
    );
  });

  //console.log('---------- filteredQueries=', filteredQueries);

  return (
    <div>
      {filteredQueries.map((key) => (
        <div
          className={`bg-box-gradient feature-card`}
          key={key}
          onClick={() => onQuerySelected(key)}
        >
          <div>
            <h4 className="font-poppins "> {queries_dds.queries_dict[key].title} </h4>
          </div>
        </div>
      ))}
    </div>
  );
}


function MainComponent({ queries_ddds, setQueries, active_s, setActive, queryResults, setQueryResults ,prevActive_s, setPrevActive}) {
  const [selectedQueryKey, setSelectedQueryKey] = useState(null);
  const [queryDict, setQueryDict] = useState({});
  const [filterString, setFilterString] = useState(""); //TODO: implement filtering
  const [curQuery_s, setCurQuery] = useState(null);

  //If selected query changed, update queries_ddds
  const handleQuerySelected = (key) => {
    if (queries_ddds[active_s].queries_dict) {
      console.log("in handleQuerySelected: key=", key);
      const newQueryDict = queries_ddds[active_s].queries_dict[key];
      setQueryDict(newQueryDict);
      setSelectedQueryKey(key); // Update the selected query key in the state
      const newQueriesDdds = { ...queries_ddds }; // Update the queries_dds object with the new query text
      setCurQuery(newQueryDict.query);
      newQueriesDdds[active_s].queries_dict[key] = newQueryDict;
      newQueriesDdds[active_s].default_query = key;
      setQueries(newQueriesDdds); //update all the queries with the currently updated
    }
  };

  //When query text changes, update queries_dds
  const handleQueryDictChange = (newText) => {
    setCurQuery(newText);
    if (queries_ddds[active_s] && selectedQueryKey) {
      //console.log("in handleQueryDictChange: newText=", newText);
      const newQueriesDdds = { ...queries_ddds }; // Update the queries_dds object with the new query text
      newQueriesDdds[active_s].queries_dict[selectedQueryKey].query = newText;
      setQueries(newQueriesDdds);
    }
  };


  useEffect(() => {
    if (active_s !== null && queries_ddds && (selectedQueryKey === null || active_s !== prevActive_s)) {
      //console.log("------ in useEffect: active_s=", active_s, "selectedQueryKey=", selectedQueryKey, "prevActive_s=", prevActive_s);
      setPrevActive(active_s);
      handleQuerySelected(queries_ddds[active_s].default_query);
    }
  }, [active_s, queries_ddds]); // Empty dependency array means this will only run on mount

  //console.log('MAIN','active_s=', active_s, 'curQuery_s=', curQuery_s, 'queries_ddds=', queries_ddds);

  return (
    <div id="features" className={`${layout.section} mb-5`}>
      {/* Left tab */}
      <div className={`${layout.sectionBox} bg-box-gradient`}>
        <div className={`${layout.sectionBoxSub}`}>
          <h2 className={`${styles.heading2}`}>
            {queryDict.title}
          </h2>
          {/* <textarea className="bg-transparent border-2 border-primary rounded-[10px] w-full h-[100px] p-4 mt-5" placeholder="Enter your SPARQL Query" /> */}
          <p className={`${styles.paragraph} mt-5 mb-5`}>
            {queryDict.comment}
          </p>
          <InputBox_sparql queryDict={queryDict} onQueryTextChange={handleQueryDictChange} />
          <Button_start endpointName={active_s} queryString={curQuery_s} setQueryResults={setQueryResults} url={queries_ddds[active_s].url} />
        </div>
      </div>
      <div className="sm:mx-4 mx-4"></div>
      {/* Right tab */}
      <div className={`${layout.sectionBox} max-h-[800px] `}>
        <input
          type="text"
          className="bg-transparent border-2 border-primary rounded-[10px] w-full h-[50px] p-4 mb-5"
          placeholder="Filter through sparql examples ..."
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
        />
        <div className={`justify-items-start bg-no-repeat bg-cover bg-center max-h-[600px] rounded-[10px] bg-box-gradient overflow-y-scroll`}>
          {
            <ShowQueries
              queries_dds={queries_ddds[active_s]}
              onQuerySelected={handleQuerySelected}
              filterString={filterString}
            />
          }
        </div>
      </div>
    </div>
  )
};

export default MainComponent;
