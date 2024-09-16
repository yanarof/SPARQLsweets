

import { useState } from "react";
import { useEffect } from 'react';

import { close, logo_sib, favicon, menu } from "../assets";
import { navLinks } from "../constants";
import styles, { layout } from "../style_light";

import React from "react";
//import getSparqlResults from "./getSparqlResults";

const Button_clear = ({ setQueryResults }) => (
  <button type="button" className={`py-3 px-5 font-poppins font-medium text-[16px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-5 mb-5 mr-5`}
    onClick={() => { setQueryResults(""); } } >
    Clear
  </button>
);


const Button_toggle = ({showRawData, setShowRawData}) => {
  const toggleDisplayMode = () => {
    setShowRawData(!showRawData);
  };

//<button type="button" className={`py-3 px-5 font-poppins font-medium text-[16px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-5 mb-5`}>
  return (
    <button type="button" className={`py-3 px-5 font-poppins font-medium text-[16px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-5 mb-5`}
       onClick={toggleDisplayMode}>
        {showRawData ? 'Show Table' : 'Show Raw Data'}
    </button>
  );
}



function ResultsDiv({ queryResults, setQueryResults }) {
  const [showRawData, setShowRawData] = useState(false);
  //console.log("-----ResultsDiv: queryResults", queryResults);
  if (queryResults.hasOwnProperty('code') && queryResults.code !== 200) { //if 'code' in keys of queryResults
    if (queryResults.hasOwnProperty('message') && queryResults.message === "") {
      queryResults.message = "Nothing ...";
    }
      
    //console.log('createTable: error', queryResults.message)
    return (
      <div className={`${layout.sectionBox} bg-box-gradient`}>
        <div className={`${layout.sectionBoxSub}`}>
          <h2 className={`${styles.heading2}`}>Error</h2>
          { queryResults.message }
        </div>
      </div>
    );
  }


  const createTable = () => {
    //console.log('createTable');
    if (queryResults.hasOwnProperty('code') && queryResults.code !== 200) { //if 'code' in keys of queryResults
      console.log('createTable: error', queryResults.message)
      return (<p>Error: {queryResults.message}.</p>);
    }
    const headers = queryResults.head.vars;
    const bindings = queryResults.results.bindings;
      
    if (bindings.length === 0) {
      return (<p>No results found.</p>);
    }
    //console.log("createTable: headers", headers);
    //console.log("createTable: bindings", bindings);
    
    //for each element in bindings, if a header is not in the binding, add it with a value of ""
    bindings.forEach((binding) => {
      headers.forEach((header) => {
        if (!binding[header]) {
          binding[header] = { type: "uri", value: "" };
        }
      });
    });


    //set color of table to white
    return (
      <div className="">
      <table className="table-auto border-collapse border border-gray-300 w-full bg-page-gradient">
        <thead>
          <tr>
            { headers.map((header, index) => (<th key={index} className="border border-gray-300 p-2"> {header} </th>)) }
          </tr>
        </thead>
        <tbody>
          {
            bindings.map((binding, rowIndex) => (
            <tr key={rowIndex}> 
              { // For each header, create a table cell with the value of the binding for that header
                headers.map((header, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                    <a href={binding[header].type === "uri" ? binding[header].value : null} className={binding[header].type==="uri" ? `${styles.uri}` : null}>
                    { // If the value is a URL, show only the last part of the URL
                        binding[header].type === "uri" ?
                          binding[header].value.split('/').pop() 
                          : binding[header].value
                    }
                  </a>
                </td>
                ))
              }
            </tr>
            ))
            //
          }
        </tbody>
      </table>
      </div>
    );
  }; //end createTable

  return (
    <div className={`${layout.sectionBox} bg-box-gradient  `}>
      <div className={`${layout.sectionBoxSub} mt-5 mb-5 `}>
        <div className="flex flex-row justify-between">
          <h2 className={`${styles.heading2}`}>Results</h2>
          <div className="flex flex-row">
            <Button_clear setQueryResults={setQueryResults}  />
            <Button_toggle  showRawData={showRawData} setShowRawData={setShowRawData} />
          </div>
        </div>

        {queryResults.results ? (
          showRawData ? (
            <pre className="bg-page-gradient">{JSON.stringify(queryResults.results, null, 2)}</pre>
          ) : (
            createTable()
          )
        ) : (
          <p>Nothing to show.</p>
        )}
        <div>
          <br></br>
        </div>
      </div>
    </div>
  );
}


export default ResultsDiv;
