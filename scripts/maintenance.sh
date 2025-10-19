#!/bin/bash

# UMAttend Server Maintenance Script
# Run this script periodically to maintain server health

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "======================================"
echo "UMAttend Server Maintenance"
echo "======================================"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script should be run with sudo${NC}"
   exit 1
fi

# Cleanup Docker
echo -e "${YELLOW}Cleaning up Docker resources...${NC}"
docker system prune -af --volumes
echo -e "${GREEN}✓ Docker cleanup complete${NC}"
echo ""

# Check disk space
echo -e "${YELLOW}Checking disk space...${NC}"
df -h
echo ""

# Check memory usage
echo -e "${YELLOW}Checking memory usage...${NC}"
free -h
echo ""

# Update system packages
echo -e "${YELLOW}Updating system packages...${NC}"
apt-get update
apt-get upgrade -y
apt-get autoremove -y
echo -e "${GREEN}✓ System packages updated${NC}"
echo ""

# Check SSL certificates
echo -e "${YELLOW}Checking SSL certificates...${NC}"
if [ -d "/var/www/umattend/staging/certbot/conf/live" ]; then
    echo "Staging certificates:"
    find /var/www/umattend/staging/certbot/conf/live -name "cert.pem" -exec openssl x509 -noout -enddate -in {} \;
fi
if [ -d "/var/www/umattend/production/certbot/conf/live" ]; then
    echo "Production certificates:"
    find /var/www/umattend/production/certbot/conf/live -name "cert.pem" -exec openssl x509 -noout -enddate -in {} \;
fi
echo ""

# Check container health
echo -e "${YELLOW}Checking container health...${NC}"
if [ -d "/var/www/umattend/staging" ]; then
    echo "Staging containers:"
    cd /var/www/umattend/staging
    docker compose -f docker-compose.staging.yml ps
fi
if [ -d "/var/www/umattend/production" ]; then
    echo "Production containers:"
    cd /var/www/umattend/production
    docker compose -f docker-compose.production.yml ps
fi
echo ""

# Rotate logs if they're too large
echo -e "${YELLOW}Checking log sizes...${NC}"
find /var/lib/docker/containers -name "*.log" -size +100M -exec truncate -s 0 {} \;
echo -e "${GREEN}✓ Large logs truncated${NC}"
echo ""

# Check firewall status
echo -e "${YELLOW}Checking firewall status...${NC}"
ufw status
echo ""

echo "======================================"
echo -e "${GREEN}Maintenance Complete!${NC}"
echo "======================================"
echo ""
echo "Summary:"
echo "- Docker resources cleaned"
echo "- System packages updated"
echo "- SSL certificates checked"
echo "- Container health verified"
echo "- Logs rotated"
echo ""
