#Migration Tool
A Utility that allows ForkDelta users to transfer their orders and balances from the deprecated (**as of date**) 
EtherDelta smart contract to the improved [ForkDelta smart contract](https://github.com/forkdelta/smart_contract). 

## TODO
* GUI
    * Replace multiselect.js with new version
    * Progress Bar for order/balance retrieval (Current token / Total # of Tokens?)
* Allow users to add custom tokens 
* Add orders
* Touch-up CSS

## Development Using NPM
[package.json](./package.json) contains the metadata of the project and should always be added to the repo.

## Front-End JS with browserify 
`npm run-script bundle-js` builds [migrate.js](./migrate.js) into [migrate_bundle.js](./migrate_bundle.js) using browserify. This allows for node modules to be 
processed with front-end JS. 

If the script gives you errors, try npm install browserify with the -g global flag to add browserify as a global CLI utility. 

Bundle script as found in [package.json](./package.json)  
```
browserify migrate.js -o migrate_bundle.js
```

### Local Server
`npm run-script server` opens a quick and easy local development server on port 1234 at 
localhost. The `-p` flag selects the port and the `-o` flag automatically opens browser upon run. 
See [http-server](https://www.npmjs.com/package/http-server) for further http-server options. 

Server script as found in [package.json](./package.json)  
```
./node_modules/http-server/bin/http-server -p 1234 -o
```

### Dependency Management
Dependencies are found in the [package.json](./package.json) file. If a dependency is added that is used in production, 
use the `--save` flag, otherwise use the `--save-dev` flag. 

Production 
```$xslt
npm install <package_name> --save
```

Development
```$xslt
npm install <package_name> --save-dev
```