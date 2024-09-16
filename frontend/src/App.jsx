import { useState } from "react";
import styles from "./style_light";
import {  MainComponent, ResultsDiv, Footer, Navbar } from "./components";
import { useEffect } from 'react';
import serverUrl from './config.js';
import axios from 'axios';


function GetQueries(setQueries) {

  /*useEffect(() => {
    const jsonData = {asdf: "asdf", uio: "uio"};
    fetch(`${serverUrl}/files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    })
      .then(response => { setQueries(response.data); })
      .catch(error => console.error(error));
  }, [setQueries]);*/



  useEffect(() => {
    axios.get(`${serverUrl}/backend/files`)
      .then(response => {
      console.log("in GetQueries: response.data=", response.data);
      setQueries(response.data);
    });
  }, [setQueries]);
}


const App = () => {
  const [prevActive_s, setPrevActive] = useState(null);
  const [active_s, setActive] = useState(window.location.hash.slice(1) || "glyconnect"); // set the default active_s to glyconnect
  //this is a hook that will run when the component mounts
  useEffect(() => {
    const handleHashChange = () => {
      setActive(window.location.hash.slice(1) || "glyconnect");
    };
    window.addEventListener('hashchange', handleHashChange);
    // Clean up the event listener when the component unmounts so we don't have a memory leak
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const [queries_ddds, setQueries] = useState({});
  const [queryResults, setQueryResults] = useState([]);
  GetQueries(setQueries); // pass setQueries as a dependency to GetQueries

  return (
    <div className="bg-primary w-full overflow-hidden" theme={styles}>
      <div className={`bg-navbar navbar ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          { /*active_s.toLowerCase()*/ }
          { Navbar({ active_s, setActive }) }
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          {
            queries_ddds && active_s && Object.keys(queries_ddds).length > 0 &&
            <MainComponent
              queries_ddds={queries_ddds}
              setQueries={setQueries}
              active_s={active_s}
              setActive={setActive}
              queryResults={queryResults}
              setQueryResults={setQueryResults}
              prevActive_s={prevActive_s}
              setPrevActive={setPrevActive}
            />
          }
          { ResultsDiv({ queryResults, setQueryResults }) }
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
