# ytb-get-video-thumbnail

This project is a utility that allows you to retrieve the thumbnail of a YouTube video using its URL.

## Installation

1. Clone this repository on your local machine.
2. Make sure you have Node.js installed.
3. Run the command `npm install` to install the dependencies.

## Usage

Create a `.env` file at the root of the project and add the YouTube API key as an environment variable `REACT_APP_API_KEY`.

```env
YTB_API_KEY=YOUR_API_KEY
```

To use this utility, you can run the following command:

```bash
npm run start
```

This will start the development server and open the application in your default browser.

You'll need to launch the proxy server to bypass the CORS policy. To do this, access the repository at [ytb-get-video-thumbnail-proxy](https://github.com/AxelVilleret/ytb-get-video-thumbnail-proxy) and follow the instructions in the README.

You will be prompted to enter the URL of the YouTube video from which you want to retrieve the thumbnail.

## See live

You can see this project live [here](https://ytb-get-video-thumbnail.netlify.app/).
