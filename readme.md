# Node.js Assessment 

This workspace contains a set of small Node.js exercises designed to practice core backend concepts such as async processing, file streaming, validation, graceful shutdown, event-driven design, and HTTP service configuration.

## Project structure

### 1. Async Task Aggregator
Location: 1.Async_Task_Aggregator

- Express API for processing multiple tasks in parallel
- Validates request payloads before execution
- Uses Promise.allSettled to run tasks without failing the whole batch
- Returns success and failure summaries for each task

Run:

```bash
cd "1.Async_Task_Aggregator"
npm install
npm start
```

### 2. Streaming Large Files
Location: 2.Streaming_large_files

- Reads a large text file with streams instead of loading everything into memory
- Uses fs.createReadStream and readline to process content line by line
- Counts total lines and characters

Run:

```bash
cd "2.Streaming_large_files"
node process-file.js
```

### 3. API Validation Errors
Location: 3.Api_validation_errors

- Express API with product creation validation
- Checks required fields, types, allowed values, and invalid payloads
- Uses Mongoose schema validation for product data

Run:

```bash
cd "3.Api_validation_errors"
npm install
node server.js
```

### 4. HTTP Server Shutdown
Location: 4.http_server_shutdown

- Demonstrates graceful shutdown behavior for an Express server
- Handles SIGINT and SIGTERM signals
- Closes active connections and exits cleanly

Run:

```bash
cd "4.http_server_shutdown"
npm install
node server.js
```

### 5. Asynchronous Job Runner
Location: 5.Asynchronous_job_runner

- Simple async job runner example using asynchronous flow and delayed execution
- Helps understand task scheduling and non-blocking behavior

Run:

```bash
cd "5.Asynchronous_job_runner"
node index.js
```

### 6. Event Driven Workflow
Location: 6.Event_driven_workflow

- Example of event-driven communication using Node.js EventEmitter
- Demonstrates triggering and handling custom events with asynchronous callbacks

Run:

```bash
cd "6.Event_driven_workflow"
node eventemitter.js
```

### 7. HTTP Service Configurations
Location: 7.Http_service_configurations

- Creates a simple HTTP service using environment variables
- Shows how to configure host, port, app name, and environment mode
- Uses dotenv to load configuration values from a .env file

Run:

```bash
cd "7.Http_service_configurations"
npm install
node server.js
```

## Learning goals

This project helps practice:

- Asynchronous programming in Node.js
- Working with streams for large file handling
- Input validation and error handling
- Graceful service shutdown
- Event-driven architecture
- HTTP server setup and configuration

## Prerequisites

- Node.js installed on the machine
- npm for installing dependencies

## Notes

Each folder is a separate mini-project and can be run independently. The code is intended for learning and experimentation rather than production deployment.
