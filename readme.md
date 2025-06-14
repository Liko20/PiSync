# PiSync Backend API

PiSync is a lightweight service that allows PiBook and PiBox devices to sync offline learning data (like videos watched, notes taken, assignments completed) to the cloud once internet is available. This project uses Express, MongoDB, Redis, and Bull queue for background job processing.

---

## 🛠️ Setup

### Prerequisites

- Node.js >= 16
- MongoDB running locally or in the cloud
- Redis running locally (for Bull queue)

### Installation

```bash
git clone https://github.com/Liko20/pisync-backend.git
npm install

### Start Redis (Windows using WSL or Redis Stack)
redis-server

###  Run Server
npm start

### Run Worker for handling the message Queue
### run worker on a different terminal
npm run worker

🧪 API Endpoints

POST /sync-event/

Request Body
{
  "device_id": "64f06b5fd1392e27106546ee",
  "timestamp": "2024-06-13T12:00:00Z",  // optional
  "total_files_synced": 7,
  "total_errors": 2,
  "internet_speed": 9
}

Response
{
  "message": "Sync event queued"
}



GET /devices/repeated-failures

Get device IDs that have more than 3 failed syncs.

Query Params (optional):

page: default 1

limit: default 10

[
    "680061e51637a32720f4109c",
    "deviceB",
    "680061e51637a32720f4109b"
]



GET /device/:id/sync-history
Get all sync logs for a device (most recent first).

Response

[
  {
    "device_id": "64f06b5fd1392e27106546ee",
    "timestamp": "2024-06-13T12:00:00Z",
    "total_files_synced": 7,
    "total_errors": 2,
    "internet_speed": 9
  }
]


🧪 Schema Design

const syncDeviceSchema = new mongoose.Schema(
  {
    device_id: { type: String, index: true, required: true },
    timestamp: { type: Date, default: Date.now },
    total_files_synced: { type: Number, default: 0 },
    total_errors: { type: Number, index: true, default: 0 },
    internet_speed: { type: Number, default: 0 },
  }
);



🧪 Scaling Plan

optimize the system for 100k devices.


Backend/API Layer

Horizontal Scaling using Kubernetes.

Load Balancer in front (e.g., NGINX, AWS ELB)



Queue System

BullMQ or RabbitMQ or kafka

retries on failure



Database Layer

MongoDB clones , Replica for availability


Caching

Redis Caching for repeat queries



DevOps

CI/CD using GitHub Actions or Jenkins

Environment Config via dotenv

Containerized with Docker
```
