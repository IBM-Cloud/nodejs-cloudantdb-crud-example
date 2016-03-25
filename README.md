# Node.js CloudantDB CRUD Example App

This application uses CloudantNoSQL database service to demonstrate the operations of Create, Read, Update and Delete (CRUD) using the Node.js runtime.


[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/IBM-Bluemix/nodejs-cloudantdb-crud-example)


## Application Requirements

* [Node.js](https://nodejs.org/en/)
* [CloudantNoSQLDatabase service] (https://cloudant.com/nosql/)

## Running the app locally:

1. If you have not already, download Node.js and install it on your local machine.
2. Clone this repository to your local machine.
3. Login to Bluemix and create a CloudantNoSQLDB service if it's not alredy present.
4. Click on the service to open it in a new page. Click on "Service Credentials" in the left pane. Note value of "url".
5. On terminal, 'cd' into folder.
6. Copy "url" from step 4 into app.js of your project present in a local respository.
   Paste url in line 13 of app.js.
		cloudant_url = "<paste 'url' here>"
   Comment out lines 20-28
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
8. cd into the project folder and if required by any modules, run
		npm install
6. Start the application by typing
		node app.js
7. When the application executes, the first line will say:
		http://localhost:<port_number>
Paste this URL in the browser to open the application.

### For more documents on CloudantNoSQLDB

* https://cloudant.com

* https://docs.cloudant.com/document.html#undefined

* https://github.com/cloudant/nodejs-cloudant/blob/master/example/crud.js

* https://www.ng.bluemix.net/docs/#services/Cloudant/index.html#Cloudant


## Troubleshooting

To troubleshoot your Bluemix app the main useful source of information are the logs, to see them, run:

  ```sh
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
