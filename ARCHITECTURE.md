# Deployment Architecture & Flow Diagrams

This document provides visual representations of the deployment architecture and workflow.

## System Architecture

```plaintext
┌─────────────────────────────────────────────────────────────────────┐
│                            Internet                                 │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DNS Resolution                                │
│          umattend-env-staging.vintasystem.com → Server IP           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Deployment Server                               │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────────┐ │
│   │              Nginx Reverse Proxy (Container)                  │ │
│   │                    Ports: 80, 443                             │ │
│   │                                                               │ │
│   │  • SSL/TLS Termination (Let's Encrypt)                        │ │
│   │  • Rate Limiting                                              │ │
│   │  • Load Balancing                                             │ │
│   │  • Security Headers                                           │ │
│   │  • Gzip Compression                                           │ │
│   └──────────────────┬────────────────────────┬───────────────────┘ │
│                      │                        │                     │
│         ┌────────────┴────────┐          ┌────┴───────────┐         │
│         │                     │          │                │         │
│         ▼                     │          ▼                │         │
│  ┌──────────────────┐         │   ┌──────────────────┐    │         │
│  │  Next.js Client  │         │   │  Express Server  │    │         │
│  │   (Container)    │         │   │   (Container)    │    │         │
│  │   Port: 3000     │◄────────┘   │   Port: 4000     │    │         │
│  │                  │             │                  │    │         │
│  │  • SSR           │             │  • REST API      │    │         │
│  │  • Static Files  │             │  • Auth          │    │         │
│  │  • Client Routes │             │  • Business      │    │         │
│  │                  │             │    Logic         │    │         │
│  └──────────────────┘             └───────┬──────────┘    │         │
│                                           │               │         │
│  ┌────────────────────────────────────────┼───────────────┘         │
│  │                                        │                         │
│  │   ┌────────────────────────────────────┼────────────────────┐    │
│  │   │          Certbot (Container)       │                    │    │
│  │   │  • Auto SSL Certificate Renewal    │                    │    │
│  │   │  • Runs every 12 hours             │                    │    │
│  │   └────────────────────────────────────┘                    │    │
│  │                                                             │    │
│  └─────────────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     External Services                               │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  PostgreSQL  │  │    Redis     │  │  SMTP Server │               │
│  │   Database   │  │    Cache     │  │    Email     │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

## Deployment Workflow - Staging

```plaintext
┌─────────────────────────────────────────────────────────────────────┐
│                         Developer                                   │
│                                                                     │
│  1. Write code                                                      │
│  2. Commit changes                                                  │
│  3. Push to 'staging' branch                                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                                │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  Triggers: .github/workflows/deploy-staging.yml             │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Runner                             │
│                                                                      │
│  Step 1: Checkout Code                                               │
│  └─► Clone repository                                                │
│                                                                      │
│  Step 2: Setup SSH                                                   │
│  └─► Load SSH_PRIVATE_KEY from secrets                               │
│  └─► Configure SSH connection                                        │
│                                                                      │
│  Step 3: Create Deployment Directory                                 │
│  └─► SSH: mkdir -p /var/www/umattend/staging                         │
│                                                                      │
│  Step 4: Copy Files                                                  │
│  └─► rsync files to server (exclude node_modules, .git, etc.)        │
│                                                                      │
│  Step 5: Create Environment Files                                    │
│  └─► Write CLIENT_STAGING_ENV_FILE → client/.env.production          │
│  └─► Write SERVER_STAGING_ENV_FILE → server/.env                     │
│                                                                      │
│  Step 6: Deploy with Docker Compose                                  │
│  └─► Stop existing containers                                        │
│  └─► Build new images                                                │
│  └─► Start new containers                                            │
│  └─► Run database migrations                                         │
│  └─► Clean up old images                                             │
│                                                                      │
│  Step 7: Setup SSL                                                   │
│  └─► Check if certificate exists                                     │
│  └─► If not, obtain from Let's Encrypt                               │
│  └─► Reload Nginx                                                    │
│                                                                      │
│  Step 8: Verify Deployment                                           │
│  └─► Check container status                                          │
│  └─► Report success/failure                                          │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    Deployment Server                                 │
│                                                                      │
│  /var/www/umattend/staging/                                          │
│  ├── client/                                                         │
│  ├── server/                                                         │
│  ├── nginx/                                                          │
│  ├── certbot/                                                        │
│  └── docker-compose.staging.yml                                      │
│                                                                      │
│  Running Containers:                                                 │
│  ├── umattend-client-staging    [Port 3000]                          │
│  ├── umattend-server-staging    [Port 4000]                          │
│  ├── umattend-nginx-staging     [Ports 80, 443]                      │
│  └── umattend-certbot-staging   [Background]                         │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        Live Application                              │
│              https://umattend-env-staging.vintasystem.com            │
└──────────────────────────────────────────────────────────────────────┘
```

## Container Communication Flow

```plaintext
┌────────────────────────────────────────────────────────────────────┐
│                     Docker Network: umattend-network               │
│                                                                    │
│  ┌──────────────┐                                                  │
│  │    Nginx     │                                                  │
│  │ Container    │                                                  │
│  └──────┬───────┘                                                  │
│         │                                                          │
│         │ Proxy Rules:                                             │
│         │                                                          │
│         │  /api/*  ────────────┐                                   │
│         │                      │                                   │
│         │  /*      ────┐       │                                   │
│         │              │       │                                   │
│         ▼              ▼       ▼                                   │
│  ┌──────────┐   ┌────────────────┐                                 │
│  │  Client  │   │     Server     │                                 │
│  │Container │   │   Container    │                                 │
│  │          │   │                │                                 │
│  │Port 3000 │◄──┤  Port 4000     │                                 │
│  │          │   │                │                                 │
│  │          │   │  API Routes:   │                                 │
│  │  Routes: │   │  /api/v1/*     │                                 │
│  │  /       │   │                │                                 │
│  │  /events │   │  Connects to:  │                                 │
│  │  /profile│   │  • Database    │                                 │
│  │  etc.    │   │  • Redis       │                                 │
│  │          │   │  • SMTP        │                                 │
│  └──────────┘   └────────────────┘                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## SSL Certificate Flow

```plaintext
┌────────────────────────────────────────────────────────────────────┐
│                  Initial SSL Setup                                 │
└────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────┐
         │ Certbot requests certificate       │
         │ from Let's Encrypt                 │
         └──────────┬─────────────────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │ Let's Encrypt verifies   │
         │ domain ownership via     │
         │ HTTP challenge           │
         │ (/.well-known/acme-      │
         │  challenge/)             │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │ Certificate issued       │
         │ Saved to:                │
         │ certbot/conf/live/       │
         │   [domain]/              │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │ Nginx loads certificate  │
         │ Enables HTTPS            │
         └──────────┬───────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Auto-Renewal (Every 12 hours)                  │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     │
│  │   Check if   │────►│   Renew if   │────►│   Reload     │     │
│  │   expiring   │     │   needed     │     │   Nginx      │     │
│  │   soon       │     │   (<30 days) │     │              │     │
│  └──────────────┘     └──────────────┘     └──────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow - API Call

```plaintext
┌─────────┐
│ Browser │
└────┬────┘
     │ HTTPS Request
     │ GET https://umattend-env-staging.vintasystem.com/api/v1/events
     ▼
┌─────────────────┐
│  Nginx (Port    │
│  443)           │
│                 │
│  1. SSL         │
│     Termination │
│  2. Rate        │
│     Limiting    │
│  3. Security    │
│     Headers     │
└────┬────────────┘
     │ Proxies to: http://server:4000/api/v1/events
     ▼
┌──────────────────┐
│  Express Server  │
│  (Port 4000)     │
│                  │
│  1. CORS Check   │
│  2. Auth         │
│     Middleware   │
│  3. Route        │
│     Handler      │
│  4. Database     │
│     Query        │
└────┬─────────────┘
     │ Returns JSON
     ▼
┌─────────────────┐
│  Nginx          │
│  Returns to     │
│  Client         │
└────┬────────────┘
     │ HTTPS Response
     ▼
┌─────────┐
│ Browser │
│ Renders │
│ Data    │
└─────────┘
```

## Multi-Environment Setup

```plaintext
┌────────────────────────────────────────────────────────────────┐
│                     Deployment Server                          │
│                                                                │
│  /var/www/umattend/                                            │
│  │                                                             │
│  ├── staging/                                                  │
│  │   ├── client/                                               │
│  │   ├── server/                                               │
│  │   ├── nginx/staging.conf                                    │
│  │   ├── certbot/                                              │
│  │   │   └── conf/live/umattend-env-staging.vintasystem.com/   │
│  │   └── docker-compose.staging.yml                            │
│  │                                                             │
│  │   Containers:                                               │
│  │   • umattend-client-staging  → Port 3000                    │
│  │   • umattend-server-staging  → Port 4000                    │
│  │   • umattend-nginx-staging   → Ports 80, 443                │
│  │   • umattend-certbot-staging                                │
│  │                                                             │
│  └── production/                                               │
│      ├── client/                                               │
│      ├── server/                                               │
│      ├── nginx/production.conf                                 │
│      ├── certbot/                                              │
│      │   └── conf/live/umattend.vintasystem.com/               │
│      └── docker-compose.production.yml                         │
│                                                                │
│      Containers:                                               │
│      • umattend-client-production  → Port 3001                 │
│      • umattend-server-production  → Port 4001                 │
│      • umattend-nginx-production   → Ports 8080, 8443          │
│      • umattend-certbot-production                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Note: Both environments can run simultaneously on the same server
using different ports for production (or different servers entirely)
```

## CI/CD Pipeline Triggers

```plaintext
┌────────────────────────────────────────────────────────────────┐
│                      Git Branches                              │
└────────────────────────────────────────────────────────────────┘

development     ─────► No auto-deploy
    │                  (CI tests only)
    │
    │ PR
    ▼
staging branch  ─────► Auto-deploy to Staging
    │                  (.github/workflows/deploy-staging.yml)
    │                  Domain: umattend-env-staging.vintasystem.com
    │
    │ PR & Testing
    ▼
main/master     ─────► Auto-deploy to Production
                       (.github/workflows/deploy-production.yml)
                       Domain: umattend.vintasystem.com
```

## Monitoring & Maintenance Flow

```plaintext
┌─────────────────────────────────────────────────────────────────┐
│                    Daily Operations                             │
└─────────────────────────────────────────────────────────────────┘

Automated:
├── SSL Certificate Renewal (Every 12 hours)
├── Nginx Config Reload (Every 6 hours)
├── Docker Log Rotation (Daily)
└── Docker System Cleanup (Weekly via cron)

Manual Monitoring:
├── Check Application Health
│   └── curl https://domain/api/v1/health
│
├── View Container Logs
│   └── docker compose logs -f
│
├── Check Container Status
│   └── docker compose ps
│
└── Review SSL Status
    └── docker compose exec certbot certbot certificates
```

---

**Legend:**

- `│` Vertical connection
- `─` Horizontal connection
- `►` Direction of flow
- `▼` Downward flow
- `┌` Top-left corner
- `└` Bottom-left corner
- `┐` Top-right corner
- `┘` Bottom-right corner
