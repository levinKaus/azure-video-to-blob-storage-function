# azure-video-to-blob-storage-function
Tutorial on how to upload videos to Azure blob storage using a HTTP trigger function with Node.js runtime stack.

### Table Of Contents
- [Prerequisites](#prerequisites)
- [Create Storage Account And Container](#create-storage-account-and-container)
- [Create Function App and Function](#create-function-app-and-function)
- [Install Packages Needed For The Function](#install-packages-needed-for-the-function)
- [Configure Storage Connection String](#configure-storage-connection-string)
- [Code Configuration](#code-configuration)
- [Check For The Uploaded Video](#check-for-the-uploaded-video)

## Prerequisites
- An Azure account with an active subscription
- A [resource group](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal) - A container that holds related resources for an Azure solution

## Create Storage Account And Container
To be able to store videos to Azure blob storage you first need to create a storage resource within your resource group in the Azure portal.
1. Search for `Storage accounts` in the search bar at the top of the panel
2. Click on `+ Create` on the storage accounts page
  - Select your subscription
  - Selcet your existing resource group
  - Come up with a name for the storage
  - Select the region that is closest to you
  - Leave the default value selected on all other fields
  - Click on `Review`
  - Click on `Create`
3. Wait for the deployment to finish
4. Click on `Go to resource`
5. Click on `Blob service` (Alternative `Container` on the navigation panel)
6. Click on "+ Container"
  - Come up with a name for the container, e.g. "video-container"
  - Select "Blob" as public access level
  - Click on "Create"

## Create Function App and Function
To upload videos you can create a function app resource with HTTP trigger.
1. Search for "Function App" in the search bar at the top of the panel
2. Click on `+ Create` on the function app page
  - Select your subscription
  - Selcet your existing resource group
  - Come up with a name for the function app resource
  - Select `Node.js` as runtime stack (Version will be selected for you)
  - Select the region matching to the region you selected for the storage
  - In the `Hosting` tab select the privious created strorage account (might not show up if regions don't macth)
  - Leave the default value selected on all other fields
  - Click on `Review + Create`
  - Click on `Create`
3. Wait for the deployment to finish
4. Click on `Go to resource`
5. Click on `Functions` on the navigation panel
6. Click on `+ Create`
  - Select the `HTTP trigger` template
  - Come up with a name for the function, e.g. `videoUpload`
  - Select `Anonymous` as authorization level to be able to call the function without API key
  - Click on `Create`

## Install Packages Needed For The Function
To make the function work there need to be some packages installed.
1. Navigate to the function app resource
2. Click on `Advanced Tools` on the navigation panel
3. Cklick on `Go` - Takes you to the Kudu Service
4. Click on `Debug console`
5. Click on `CMD` on the drop down menu and wait for it to load
6. Click on the `site` folder
7. Click on the `wwwroot` folder
8. Click on the folder with the name of the function you just created
8. Click inside the Kudu Remote Execution Console
9. Copy the following into the console and hit enter to create a `package.json`:
```
npm init -y
```
10. Copy the following into the console and hit enter to install required packages:
```
npm install @azure/storage-blob uuid dotenv parse-multipart
```

## Configure Storage Connection String
For the function to be able to connect to the storage it needs the storage connection key. You can configure that connection string inside of the function app resource. 
1. Navigate to the storage account resource
2. Click on `Access keys` on the navigation panel
3. Click on `Show` next to the connection string of `key1`
4. Copy the connection string
5. Navigate to the function app resource
6. Click on `Configuration` on the navigation panel
7. Click on `+ New application setting`
  - Copy the following into the `Name` field:
  ```
  AZURE_STORAGE_CONNECTION_STRING
  ```
  - Paste your connection string into the `Value` field
  - Click on `Save`

## Code Configuration
To make the function to upload videos to the blob storage, the code needs to be configured accordingly. 
1. Navigate to the function app resource
2. Click on `Functions` on the navigation panel
3. Click on the function you just created
4. Click on `Code + Test` on the navigation panel
5. Make sure the `index.js` file is selected
6. Copy and insert the code from [`index.js`](https://github.com/levinKaus/azure-video-to-blob-storage-function/Code-backend/index.js)
  - Make sure `const container="YOUR CONTAINER NAME"` matches your container name wihtin the js file
7. Click on `Save`
8. Configure the [`upload-page.html`](https://github.com/levinKaus/azure-video-to-blob-storage-function/Code-frontend/upload-page.html) file
  - Click on `Get function URL` in the Azure portal and copy the URL
  - Paste the URL at `YOUR FUCTION URL` within the html file
  - To allow the axios cdn to interact with your backend go click on `CORS` on the navigaiton panel
  - Click into the typing bar, write the wildcard `*`, and delete the existing origins
  - Click on `Save`
9. Open the file in your browser now
10. Select the video you want to upload in the form and click on the submit button

## Check For The Uploaded Video
1. Navigate to the storage account resource
2. Click on `Blob Service` (Alternative `Container` on the navigation panel)
3. Click on your created storage container
4. You should see your uploaded file inside of here