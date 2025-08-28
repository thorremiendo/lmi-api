# LMIS API - EC2 Deployment & Maintenance Guide

## Overview
This guide covers how to maintain and redeploy your LMIS API on your existing AWS EC2 instance. Your server is already set up with Node.js, PostgreSQL, Nginx, and PM2.

**EC2 Instance**: `ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com`  
**Application Folder**: `~/lmis-api`  
**PM2 Process Name**: `nestjs-api`

---

## Quick Connection

### Connect to Your EC2 Instance
```bash
# Connect using your PEM key
ssh -i /Users/thorremiendo/Documents/calami-t.pem ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com

# Or using IP directly
ssh -i /Users/thorremiendo/Documents/calami-t.pem ec2-user@13.212.252.14
```

---

## Check Service Status

### Complete Status Check (Recommended)
```bash
# Run this to see everything at once
echo "=== Complete Service Status ==="
echo ""

echo "=== PM2 Status (API) ==="
pm2 status
echo ""

echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager -l
echo ""

echo "=== PostgreSQL Status ==="
sudo systemctl status postgresql --no-pager -l
echo ""

echo "=== Port Status ==="
echo "Port 80 (HTTP): $(sudo netstat -tlnp | grep :80 || echo 'Not listening')"
echo "Port 3000 (API): $(sudo netstat -tlnp | grep :3000 || echo 'Not listening')"
echo "Port 5432 (DB): $(sudo netstat -tlnp | grep :5432 || echo 'Not listening')"
echo ""

echo "=== API Test ==="
curl -s http://localhost:3000/api | head -5
echo ""

echo "=== System Resources ==="
df -h
echo ""
free -h
```

### Individual Service Checks
```bash
# Check API status
pm2 status
pm2 logs nestjs-api --lines 20

# Check Nginx status
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Check Database status
sudo systemctl status postgresql
sudo tail -f /var/log/postgresql/postgresql-*.log

# Check disk space and memory
df -h
free -h
```

---

## Redeploy Your Application

### Method 1: Build Locally & Transfer (Recommended)
```bash
# On your LOCAL machine:
# 1. Build the application
npm run build

# 2. Generate Prisma client
npx prisma generate

# 3. Transfer to EC2 (using scp)
scp -i /Users/thorremiendo/Documents/calami-t.pem -r dist/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/
scp -i /Users/thorremiendo/Documents/calami-t.pem -r node_modules/@prisma/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/node_modules/

# On your EC2 instance:
# 4. Navigate to app folder
cd ~/lmis-api

# 5. Run database migrations (if any)
npx prisma migrate deploy

# 6. Restart the application
pm2 restart nestjs-api

# 7. Check status
pm2 status
```

### Method 2: Git Pull & Build on EC2
```bash
# Navigate to your application folder
cd ~/lmis-api

# Pull latest changes from Git
git pull origin main

# Install/update dependencies
npm install

# Build the application
npm run build

# Generate Prisma client
npx prisma generate

# Run database migrations (if any)
npx prisma migrate deploy

# Restart the application
pm2 restart nestjs-api

# Check status
pm2 status
```

### Method 3: Quick One-Line Redeployment (Git method)
```bash
cd ~/lmis-api && git pull origin main && npm install && npm run build && npx prisma generate && pm2 restart nestjs-api
```

### Method 4: Create and Use Deployment Scripts

#### Local Build Script (create on your local machine)
```bash
# Create local-build.sh on your LOCAL machine
nano local-build.sh

# Add this content:
#!/bin/bash
echo "Building LMIS API locally..."

# Build the application
echo "Building application..."
npm run build

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Transfer to EC2
echo "Transferring to EC2..."
scp -i /Users/thorremiendo/Documents/calami-t.pem -r dist/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/
scp -i /Users/thorremiendo/Documents/calami-t.pem -r node_modules/@prisma/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/node_modules/

echo "Transfer completed! Now SSH to EC2 and run: pm2 restart nestjs-api"
```

#### EC2 Deployment Script (create on EC2)
```bash
# Create deploy.sh on your EC2 instance
nano deploy.sh

# Add this content:
#!/bin/bash
echo "Deploying LMIS API on EC2..."

cd ~/lmis-api

# Run database migrations (if any)
echo "Running database migrations..."
npx prisma migrate deploy

# Restart the application
echo "Restarting application..."
pm2 restart nestjs-api

echo "Deployment completed!"
echo "Check status with: pm2 status"
echo "Check logs with: pm2 logs nestjs-api"
```

# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

---

## Why Build Locally & Transfer?

### ✅ **Advantages of Local Build:**
- **Faster builds** - Your local machine is likely more powerful
- **No dependency conflicts** - Clean build environment
- **Consistent builds** - Same environment every time
- **Faster deployment** - Only transfer built files, not source code
- **No internet issues** - Build doesn't depend on EC2 internet connection
- **Version control** - Keep your source code local, only deploy built version

### ⚠️ **Considerations:**
- **Environment differences** - Ensure Node.js versions match
- **File transfer time** - Depends on your internet speed
- **Manual process** - Requires two steps (build + transfer)

### 🔄 **When to Use Each Method:**
- **Local Build + Transfer**: Production deployments, major updates
- **Git Pull + Build on EC2**: Quick fixes, when you need to test on EC2
- **One-line Git**: Emergency fixes, when local build isn't working

---

## Troubleshooting Common Issues

### Application Won't Start
```bash
# Check PM2 logs
pm2 logs nestjs-api

# Check application logs
tail -f ~/lmis-api/logs/combined.log

# Verify environment variables
pm2 env nestjs-api

# Restart if needed
pm2 restart nestjs-api
```

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log

# Test database connection
psql -h localhost -U lmis_user -d lmis_db

# Restart PostgreSQL if needed
sudo systemctl restart postgresql
```

### Nginx Issues
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Restart Nginx if needed
sudo systemctl restart nginx
```

### Port Already in Use
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill process if needed
sudo kill -9 <PID>
```

---

## Monitoring and Maintenance

### Real-time Monitoring
```bash
# Monitor PM2 processes
pm2 monit

# Watch logs in real-time
pm2 logs nestjs-api --lines 100 -f

# Monitor system resources
htop
```

### Log Management
```bash
# View recent logs
pm2 logs nestjs-api --lines 50

# Clear logs if they get too large
pm2 flush

# Check log file sizes
ls -lh ~/lmis-api/logs/
```

### Database Maintenance
```bash
# Check database size
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('lmis_db'));"

# Check active connections
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity;"

# Backup database
pg_dump -h localhost -U lmis_user lmis_db > ~/backup_$(date +%Y%m%d_%H%M%S).sql
```

---

## Emergency Procedures

### Quick Restart Everything
```bash
# Restart all services
sudo systemctl restart postgresql
sudo systemctl restart nginx
pm2 restart all

# Check status
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql
```

### Complete Application Reset
```bash
# Stop application
pm2 stop nestjs-api

# Delete and recreate
pm2 delete nestjs-api
cd ~/lmis-api
npm run build
pm2 start dist/src/main.js --name nestjs-api

# Save PM2 configuration
pm2 save
```

---

## Useful Commands Reference

### Application Management
```bash
# PM2 commands
pm2 start ecosystem.config.js --env production
pm2 restart nestjs-api
pm2 stop nestjs-api
pm2 delete nestjs-api
pm2 logs nestjs-api
pm2 monit
pm2 save
pm2 startup
```

### Database Management
```bash
# PostgreSQL commands
sudo systemctl restart postgresql
sudo -u postgres psql
pg_dump -h localhost -U lmis_user lmis_db > backup.sql
```

### Nginx Management
```bash
# Nginx commands
sudo systemctl restart nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### System Management
```bash
# System commands
sudo apt update && sudo apt upgrade -y
sudo ufw status
htop
df -h
free -h
```

---

## Testing Your API

### Test from EC2 Instance
```bash
# Test local API
curl http://localhost:3000/api

# Test through Nginx
curl http://localhost/api

# Test specific endpoints
curl http://localhost:3000/api/municipalities
curl http://localhost:3000/api/auth/status
```

### Test from Your Local Machine
```bash
# Test live API
curl http://ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com/api

# Test specific endpoints
curl http://ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com/api/municipalities
```

---

## Regular Maintenance Schedule

### Daily
- Check PM2 status: `pm2 status`
- Monitor logs: `pm2 logs nestjs-api --lines 20`

### Weekly
- Check system resources: `htop`, `df -h`, `free -h`
- Review application logs for errors
- Check database performance

### Monthly
- Update system packages: `sudo apt update && sudo apt upgrade -y`
- Review and rotate logs if needed
- Check SSL certificate expiration (if using HTTPS)

---

## Support

### When Things Go Wrong
1. **Check status first**: Use the complete status check script
2. **Check logs**: Look at PM2, Nginx, and PostgreSQL logs
3. **Restart services**: Use the emergency restart procedures
4. **Check resources**: Ensure you have enough disk space and memory

### Useful Log Locations
- **Application logs**: `pm2 logs nestjs-api`
- **Nginx logs**: `/var/log/nginx/error.log`, `/var/log/nginx/access.log`
- **PostgreSQL logs**: `/var/log/postgresql/postgresql-*.log`
- **System logs**: `sudo journalctl -u nginx`, `sudo journalctl -u postgresql`

---

## Quick Reference

### Connect & Check
```bash
# Connect
ssh -i /Users/thorremiendo/Documents/calami-t.pem ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com

# Check status
echo "=== Status ===" && pm2 status && sudo systemctl status nginx --no-pager -l && sudo systemctl status postgresql --no-pager -l
```

### Redeploy
```bash
# Method 1: Local Build + Transfer (Recommended)
# On local machine:
npm run build && npx prisma generate
scp -i /Users/thorremiendo/Documents/calami-t.pem -r dist/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/
scp -i /Users/thorremiendo/Documents/calami-t.pem -r node_modules/@prisma/ ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com:~/lmis-api/node_modules/

# Connect using your PEM key
ssh -i /Users/thorremiendo/Documents/calami-t.pem ec2-user@ec2-13-212-252-14.ap-southeast-1.compute.amazonaws.com

# On EC2:
cd ~/lmis-api && npx prisma migrate deploy && pm2 restart nestjs-api

# Method 2: Git Pull + Build on EC2
cd ~/lmis-api && git pull origin main && npm install && npm run build && npx prisma generate && pm2 restart nestjs-api
```

# Check the new timestamps
ls -la ~/lmis-api/dist/src/auth/
ls -la ~/lmis-api/dist/src/app.module.js
curl http://localhost:3000/api

### Restart Everything
```bash
sudo systemctl restart postgresql && sudo systemctl restart nginx && pm2 restart all
```

Your LMIS API is now easily maintainable and redeployable! 🚀
