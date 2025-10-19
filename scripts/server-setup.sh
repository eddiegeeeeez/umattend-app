#!/bin/bash

# UMAttend Application - Initial Server Setup Script
# This script prepares a fresh Ubuntu server for Docker deployment

set -e

echo "======================================"
echo "UMAttend Server Setup Script"
echo "======================================"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root or with sudo" 
   exit 1
fi

# Update system
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install required packages
echo "Installing required packages..."
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    ufw

# Install Docker
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    # Add current user to docker group
    if [ -n "$SUDO_USER" ]; then
        usermod -aG docker $SUDO_USER
        echo "Added $SUDO_USER to docker group"
    fi
else
    echo "Docker is already installed"
fi

# Install Docker Compose
echo "Installing Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose is already installed"
fi

# Configure firewall
echo "Configuring firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

# Create application directories
echo "Creating application directories..."
mkdir -p /var/www/umattend/staging
mkdir -p /var/www/umattend/production
chown -R $SUDO_USER:$SUDO_USER /var/www/umattend

# Setup Docker log rotation
echo "Setting up Docker log rotation..."
cat > /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

# Restart Docker to apply changes
systemctl restart docker

# Setup automatic security updates
echo "Setting up automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Create cron job for Docker cleanup
echo "Setting up Docker cleanup cron job..."
(crontab -u $SUDO_USER -l 2>/dev/null; echo "0 2 * * 0 docker system prune -af --volumes") | crontab -u $SUDO_USER -

echo ""
echo "======================================"
echo "Server Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Log out and log back in for Docker group changes to take effect"
echo "2. Configure your GitHub Actions secrets"
echo "3. Push to staging or production branch to trigger deployment"
echo ""
echo "Useful commands:"
echo "  - Check Docker status: sudo systemctl status docker"
echo "  - View Docker logs: docker logs <container_name>"
echo "  - Check firewall status: sudo ufw status"
echo ""
