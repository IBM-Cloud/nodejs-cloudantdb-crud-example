# NodeJSCloudantSampleApp Overview

This application uses the [Cloudant NoSQL Database service](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db) to demonstrate the operations of Create, Read, Update and Delete into database using the Node.js runtime. Cloudant node module is used for these operations. They can alternatively be done with API calls which returns a JSON.

### Click on the button below to deploy this Bluemix project to your account

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://hub.jazz.net/deploy/index.html?repository=https://github.com/IBM-Bluemix/nodejs-cloudantdb-crud-example)


## Application Requirements

* Node.js runtime
* Cloudant NoSQL Database service

## Running the app on Bluemix

* [Sign up][sign_up] for Bluemix. 
* Download and install Cloud Foundry CLI to be used on the terminal.
* Fork this project into your Gitub account by clickig on the "Fork Project" button in the top-right hand corner of this page : https://github.com/IBM-Bluemix/nodejs-cloudantdb-crud-example
* On the Terminal, Connect to Bluemix using the CF CLI and follow the prompts to log in. 
* Once you're in the same space as the app, create the Cloudant NoSQL DB service in Bluemix
```
    $cf api https://api.ng.bluemix.net
    $cf login
    $cf create-service cloudantNoSQLDB Lite <service-name>
```
* Bind this service to your app
```
    $cf bs NodeJSCloudantSampleApp <service-name-as-in-previous-step>
```
* Edit the manifest.yml file and change the <application-host> parameter to something unique.
```
    applications:
    - path: .
    name: NodeJSCloudantSampleApp
    host: <change_to_something_unique>
    framework: node
    memory:256M
    instances: 1
    services:
    - <service-name>
```
   The host you use will determinate your application url(e.g. <host>.mybluemix.net). REMOVE the following lines from manifest.yml as you no longer need this cloudant service. The one you created in step 4 will be the one primarily used.
```   
	declared-services:
  	   cloudant-nodejs:
    	     label: cloudantNoSQLDB
    	     plan: Shared
```    	     
* Start the application by typing
```
    $cf start NodeJSCloudantSampleApp
```    

And voila! Your very own instance of Cloudant NoSQL DB with NodeJSCloudantSampleApp is now running on Bluemix.

## Running the app locally:

* If you have not already, download node.js and install it on your local machine.
* Download the project to your local machine from this link :
```
https://github.com/IBM-Bluemix/nodejs-cloudantdb-crud-example
```
* On Bluemix Dashboard, create Cloudant No SQLDB service if it's not alredy present.
* Click on the service to open it in a new page. Click on "Service Credentials" in the left pane. Note value of "url".
* On terminal, 'cd' into folder.
* Copy "url" from step 4 into app.js of your project present in a local respository.
   Paste url in line 13 of app.js.
```
	cloudant_url = "<paste 'url' here>"
```		
   Comment out lines 20-28
```   
		/*
			if(process.env.VCAP_SERVICES)
			{
				services = JSON.parse(process.env.VCAP_SERVICES);
				if(services.cloudantNoSQLDB) //Check if cloudantNoSQLDB service is bound to your project
				{
					cloudant_url = services.cloudantNoSQLDB[0].credentials.url;  //Get URL and other paramters
					console.log("Name = " + services.cloudantNoSQLDB[0].name);
					console.log("URL = " + services.cloudantNoSQLDB[0].credentials.url);
    				console.log("username = " + services.cloudantNoSQLDB[0].credentials.username);
					console.log("password = " + services.cloudantNoSQLDB[0].credentials.password);
				}
			}
 		*/
``` 		
* cd into the project folder and if required by any modules, run
```
		npm install
```		
* Start the application by typing
```
		node app.js
```		
* When the application executes, the first line will say:
```
		http://localhost:<port_number>
```		
Paste this URL in the browser to open the application.

### For more documents on Cloudant NoSQL DB

* https://cloudant.com

* https://docs.cloudant.com/document.html#undefined

* https://github.com/cloudant/nodejs-cloudant/blob/master/example/crud.js

* https://www.ng.bluemix.net/docs/#services/Cloudant/index.html#Cloudant


## Troubleshooting

To troubleshoot your Bluemix app the main useful source of information are the logs, to see them, run:

  ```
  $ cf logs <application-name> --recent
  ```

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
  This sample uses [socket.io](http://socket.io/) which is MIT license
## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[service_url]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[sign_up]: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI
