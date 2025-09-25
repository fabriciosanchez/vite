# VITE - Virtual Interviewer Environment

This project is a React-based web application that allows candidates to practice interviews with a virtual interviewer, created with Vite and deployable to Google Cloud Run.

Project Structure

```/
├── Dockerfile
├── index.html
├── nginx.conf
├── package.json
├── README.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Before running the application

**1. Enable and configure both Gemini and the Text-to-Speech (TTS) API**

VITE leverages both Gemini and Speech-To-Text APIs for generating the conversational flow. So, before running the application, make sure to enable and configure it properly. Refer to below tutorial to enable both APIs at Google Cloud console.

* <a href="https://cloud.google.com/endpoints/docs/openapi/enable-api" target="_blank">Enabling APIs with Google Cloud Console</a>

Once you have them both enabled in your Google Cloud project, configure TTS API Key restrictions (for your local development). This ensures credential access to VITE when accessing TTS API. To do that, follow the steps below:

To avoid 403 (Forbidden) errors when running locally, you must restrict your API key to allow requests from localhost.

* On the Credentials page, click the pencil icon to edit your new API key.
* Under Application restrictions, select IP addresses.
* Click ADD AN ITEM and add the following IP addresses:
```
  127.0.0.1
  ::1
  localhost
  ```

> Note: If you still encounter 403 errors, your system may be using its public IPv6 address. The error message in the browser's developer console will tell you the exact "originating IP address" that you need to add to this list.

* Under API restrictions, ensure **"Don't restrict key"** is selected, or if you do restrict it, make sure both the "Generative Language API" and "Cloud Text-to-Speech API" are on the allowed list.
* Click Save.

It usually takes from 2-3 minutes for the service to update these configurations.

**2. Create and populate an .env file**

Now that you have your Gemini KEY and credentials properly configured, in the root directory of the application, create a new ```.env``` file with the following contents:

```
VITE_GEMINI_API_KEY={YOUR_GEMINI_API_KEY}
```

If you are just trying this application, you can go to <a href="https://aistudio.google.com/" target="_blank">https://aistudio.google.com/</a> and get one for free with limited usage.

## Running Locally

To run this application on your local machine, you'll need Node.js (which includes npm).

1. Install Dependencies:

Open a terminal in the project's root directory and run:

```
npm install
```

2. Start Development Server:

Run the following command to start the Vite development server:

```
npm run dev
```

Your application will be available at http://localhost:5173 (or another port if 5173 is in use). The app will hot-reload as you make changes.

> Note: For the Speech-to-Text and Text-to-Speech to work, you must access the site over https (even locally) or localhost. http://localhost:5173 is fine. You also must grant microphone permissions when prompted by the browser.

## Deploying to Google Cloud Run

This setup is containerized with Docker, making it perfect for Google Cloud Run.

### Prerequisites

* Google Cloud SDK (gcloud CLI) installed and configured.
* Docker installed and running.
* A Google Cloud Project with the Cloud Run and Artifact Registry APIs enabled.

### Deployment Steps

**Build the Docker Image:**

In your terminal, from the project root, build the image. Replace ```[PROJECT-ID]``` with your Google Cloud Project ID and ```[APP-NAME]``` with your desired app name (e.g., virtual-interviewer).

```
docker build -t us-central1-docker.pkg.dev/[PROJECT-ID]/cloud-run-source-deploy/[APP-NAME] .
```

(Example: docker build -t us-central1-docker.pkg.dev/my-gcp-project/cloud-run-source-deploy/interview-app .)

**Configure Docker Authentication:**

Allow Docker to push to your project's Artifact Registry.

```
gcloud auth configure-docker us-central1-docker.pkg.dev
```

**Push the Image to Artifact Registry:**

Push the image you just built.

```
docker push us-central1-docker.pkg.dev/[PROJECT-ID]/cloud-run-source-deploy/[APP-NAME]
```

**Deploy to Cloud Run:**

Deploy the container image to Cloud Run. This command will prompt you to select a region, allow unauthenticated invocations (to make it public), and more.

```
gcloud run deploy [APP-NAME] \
  --image=us-central1-docker.pkg.dev/[PROJECT-ID]/cloud-run-source-deploy/[APP-NAME] \
  --platform=managed \
  --allow-unauthenticated
```

After the command completes, it will give you a Service URL. This is the public URL for your deployed application!