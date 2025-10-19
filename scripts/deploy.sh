#!/bin/bash

# UMAttend Deployment Helper Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Display usage
usage() {
    echo "Usage: $0 {local|staging|production} {up|down|restart|logs|build}"
    echo ""
    echo "Environments:"
    echo "  local       - Local development environment"
    echo "  staging     - Staging environment"
    echo "  production  - Production environment"
    echo ""
    echo "Commands:"
    echo "  up          - Start containers"
    echo "  down        - Stop containers"
    echo "  restart     - Restart containers"
    echo "  logs        - View container logs"
    echo "  build       - Rebuild containers"
    echo "  migrate     - Run database migrations"
    echo "  status      - Show container status"
    echo ""
    echo "Examples:"
    echo "  $0 local up"
    echo "  $0 staging logs"
    echo "  $0 production restart"
    exit 1
}

# Check arguments
if [ $# -lt 2 ]; then
    usage
fi

ENV=$1
CMD=$2

# Determine compose file
case $ENV in
    local)
        COMPOSE_FILE="docker-compose.local.yml"
        ;;
    staging)
        COMPOSE_FILE="docker-compose.staging.yml"
        ;;
    production)
        COMPOSE_FILE="docker-compose.production.yml"
        ;;
    *)
        echo -e "${RED}Error: Invalid environment '$ENV'${NC}"
        usage
        ;;
esac

# Execute command
case $CMD in
    up)
        echo -e "${GREEN}Starting $ENV environment...${NC}"
        docker compose -f $COMPOSE_FILE up -d
        echo -e "${GREEN}Containers started successfully!${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    down)
        echo -e "${YELLOW}Stopping $ENV environment...${NC}"
        docker compose -f $COMPOSE_FILE down
        echo -e "${GREEN}Containers stopped successfully!${NC}"
        ;;
    restart)
        echo -e "${YELLOW}Restarting $ENV environment...${NC}"
        docker compose -f $COMPOSE_FILE restart
        echo -e "${GREEN}Containers restarted successfully!${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    logs)
        echo -e "${GREEN}Showing logs for $ENV environment...${NC}"
        docker compose -f $COMPOSE_FILE logs -f
        ;;
    build)
        echo -e "${GREEN}Building $ENV environment...${NC}"
        docker compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}Build completed successfully!${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    migrate)
        echo -e "${GREEN}Running database migrations for $ENV...${NC}"
        if [ "$ENV" = "local" ]; then
            docker compose -f $COMPOSE_FILE exec server npm run prisma:migrate:dev
        else
            docker compose -f $COMPOSE_FILE exec server npm run prisma:migrate:deploy
        fi
        echo -e "${GREEN}Migrations completed successfully!${NC}"
        ;;
    status)
        echo -e "${GREEN}Container status for $ENV environment:${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    *)
        echo -e "${RED}Error: Invalid command '$CMD'${NC}"
        usage
        ;;
esac
