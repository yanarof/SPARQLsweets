
# Overview
This website was developped in React and JS with the Vite framework, a running instance can be viewed at https://glyconnect.expasy.org/sparqlsweets/

# Adding queries
All the folders in `./backend` starting with `queries_...` will be used, the same names need to be present in the `./src/constants/index.js` (such as `queries_unilectin` and `unilectin` in index.js)
Each query need to be formatted in the following way:
```sparql
#title: some title
#comment: some comment
SELECT * {?s ?p ?o } LIMIT 10 #what is not a title or comment is part of the querry
```

# Adding new end-point
- Add the settings to the `src/constants/index.js` file
- Copy/paste a folder such as `queries_glyconnect` to `queries_YOURENDPOINTNAME`
- Edit the `queries_YOURENDPOINTNAME/config.json`
- The folder needs to have a `000_default.rq` which will be the query loaded by default (you can edit its content though)
- All the other queries can be removed/edited



# Deploy

## Configurations before deployment
- Replace the correct server-url in `config.js` at which the server should be available
- Configure the port where the server should appear in `docker-compose.yml`
- **If** you're using a reverse proxy to access to this website configure your reverse proxy in apache: for instance

```apache.conf
ProxyPass /sparqlsweets http://frontend-container timeout=600
ProxyPassReverse /sparqlsweets http://frontend-container timeout=600
#the timeout is useful if the error 503 appears when loading page
```

## Run it
- build the website with `docker compose up`
- The queries can be directly added to the `backend/query_...` folders, reloading the page, will direclt update the queries
- If any other modifications were made, you will need to `docker compose down ; docker compose build ; docker compose up -d`



