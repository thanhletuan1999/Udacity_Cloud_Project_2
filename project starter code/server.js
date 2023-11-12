import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // filtered image
  app.get('/filteredimage', async(req, res) => {

    const imageUrl = req.query.image_url.toString();

    if(!checkImageUrl(imageUrl)){
      res.status(400).send("Image url is not valid! Plsease send again!");
    }

    // get image
    const filter_image = await filterImageFromURL(imageUrl);

    // send result and delete local file
    res.status(200).sendFile(filter_image,() => {deleteLocalFiles([filter_image])})
  })

  // check the image_url
  const checkImageUrl = (imageUrl) => {
    return imageUrl.match(/^https?:\/\/.+\/.+$/);
  }
  
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );