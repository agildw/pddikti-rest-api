
# PDDIKTI Rest API
This repository contains a REST API for PDDIKTI (Indonesian Higher Education Data Integration) with advanced search functionality including the ability to search for matches that contain a specific string, matches that are an exact match, matches that start with a specific string, and matches that end with a specific string.




## Query Parameters

This API supports various query parameters to filter and retrieve specific data. The available query parameters include:

`name` (Required)

`exact` to search for data that is an exact match of a specific string.

`startwith` to search for data that starts with a specific string.

`endwith` to search for data that ends with a specific string.

`contains` to search for data that contains a specific string.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can refer to the `.env.example` file for an example.

### Required
`PDDIKTI_API_URL`

`PDDIKTI_FRONTEND_URL`

### Optional
`PORT`
## Run Locally

Clone the project

```bash
  git clone https://github.com/agildw/pddikti-rest-api.git
```

Go to the project directory

```bash
  cd pddikti-rest-api
```

Install dependencies

```bash
  npm install
```

Build

```bash
  npm run build
```

Start the program

```bash
  npm run start
```

