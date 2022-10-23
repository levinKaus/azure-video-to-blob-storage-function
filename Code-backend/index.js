const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
require('dotenv').config()

const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"];
var multipart = require("parse-multipart");

async function upload(part) {
    // Get a reference to the video-container
        const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const container="YOUR CONTAINER NAME";
        const containerClient = await blobServiceClient.getContainerClient(container);

        // Upload a blob to the video-container
        const blobName = uuidv1() + part.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(part.data, part.data.length);
}

module.exports = async function(context, req) {
    console.log("HELLO WORLD");
    if (!AZURE_STORAGE_CONNECTION_STRING) {throw Error("Azure Storage Connection string not found");}
    if (req.body) {

        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);

        upload(parts[0])
        context.res = {
            body: "The upload was successfull."
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a video in the request body."
        };
    }
};