# VITE API

This is a simple Node.js backend service built with Express that provides an endpoint to save interview data into a PostgreSQL database.

## Features

- **Endpoint**: `POST /save-interview` to receive and store interview details.
- **Database**: Integrates with a PostgreSQL database.
- **Containerized**: Includes a `Dockerfile` for easy deployment to container platforms like Google Cloud Run.

---

## Running Locally

Follow these steps to run the API server on your local machine for development and testing.

### Prerequisites

- Node.js (v20 or later recommended)
- npm (comes with Node.js)
- A running PostgreSQL database instance.

### 1. Install Dependencies

Navigate to this directory (`src/api`) and install the required npm packages.

```bash
npm install
```

### 2. Configure Environment Variables

The server requires database credentials to connect to your PostgreSQL instance. Create a `.env` file in this directory (`src/api`).

```bash
touch .env
```

Now, open the `.env` file and add the following variables, replacing the placeholder values with your actual database connection details.

```ini
# .env

# PostgreSQL Connection Details
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password

# Port for the local web server
PORT=8080
```

### 3. Create Postgres SQL instance

If you are planning to run this locally, you can install and execute a Postgres server at your machine by <a href="https://www.postgresqltutorial.com/install-postgresql/" target="_blank">following this tutorial</a>.

If you're planning to run this in Google Cloud SQL for Postgres, you can deploy an instance of the service by following the <a href="https://cloud.google.com/sql/docs/postgres/quickstart" target="_blank">Google Cloud documentation</a>.

Once you have your instance installed/deployed, you can go ahead and create a new database by running the command below.

```sql
create database vitedb;
```

Then, you can use the command below to create the table structure.

```sql
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    candidate_name VARCHAR(255) NOT NULL,
    candidate_email VARCHAR(255) NOT NULL,
    candidate_current_role VARCHAR(255),
    applied_for_position VARCHAR(255) NOT NULL,
    question_types JSONB,
    interview_duration_minutes INTEGER,
    transcript JSONB,
    feedback TEXT
);
```


### 3. Run the Server

Start the Express server with the following command:

```bash
node server.js
```

You should see the following output in your terminal, confirming the server is running:

```
Server listening on port 8080
```

---

## Deployment to Google Cloud Run

This service is designed to be deployed as a container on Google Cloud Run. The provided `Dockerfile` handles the container image creation.

### Prerequisites

- Google Cloud SDK (gcloud CLI) installed and configured.
- A Google Cloud project with the Cloud Run and Cloud Build APIs enabled.
- A Cloud SQL for PostgreSQL instance (or other accessible PostgreSQL database).
- Secret Manager API enabled to store the database password securely.
- A Google Cloud Artifact Registry with a repository named ```cloud-run-source-deploy``` created.

### 1. Store the Database Password in Secret Manager

For security, your database password should not be passed as a plain-text environment variable.

```bash
# Create the secret
gcloud secrets create db-password --replication-policy="automatic"

# Add the password as a secret version. The command will wait for your input.
# Type your password, press Enter, and then press Ctrl+D (or Ctrl+Z on Windows) to finish.
gcloud secrets versions add db-password --data-file=-
```

### 2. Generate image and deploy to Cloud Run

In your terminal, from the project root, build the image. Replace ```[PROJECT-ID]``` with your Google Cloud Project ID and ```[APP-NAME]``` with your desired app name (e.g., virtual-interviewer).

```
docker build -t us-central1-docker.pkg.dev/[PROJECT-ID]/cloud-run-source-deploy/[APP-NAME] .
```

(Example: docker build -t us-central1-docker.pkg.dev/my-gcp-project/cloud-run-source-deploy/vite-api .)

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

**Deploy the container image to Cloud Run, securely injecting the database credentials**

- The `--set-env-vars` flag sets non-sensitive information.
- The `--set-secrets` flag maps the Secret Manager secret to an environment variable (`DB_PASSWORD`).

Replace `[PROJECT-ID]`, `[DB_USER]`, `[DB_HOST]`, and `[DB_NAME]` with your specific values.

```bash
gcloud run deploy vite-api \
  --image us-central1-docker.pkg.dev/[PROJECT-ID]/cloud-run-source-deploy/vite-api:tag \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="DB_USER=[DB_USER],DB_HOST=[DB_HOST],DB_NAME=[DB_NAME]" \
  --set-secrets="DB_PASSWORD=db-password:latest"
```

***Permission denied error***

If you see an error related to permission denied on the secret, it means that the service account running your Cloud Run revision doesn't have permission to access the secret you assigned to it.

Cloud Run uses a specific service account (in this case, the Compute Engine default service account) to execute your code. You need to explicitly grant that account the "Secret Manager Secret Accessor" role so it can read the value of your ```db-password``` secret.

To solve it, run the following gcloud command:

```
gcloud secrets add-iam-policy-binding db-password \
  --member="serviceAccount:{your-compute-service-account}@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

After deployment, Cloud Run will provide a public URL where your service is accessible.