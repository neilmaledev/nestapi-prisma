# Build for development (Dockerfile by default)
docker build -t nestapi-docker .

# Build for production (Dockerfile.prod)
docker build -t nestapi-prod-docker -f Dockerfile.prod .

# Compose for development (docker-compose.yml by default)
docker-compose up --build
## -d to run in background and do not block the current terminal
docker-compose up --build -d

# Compose for production (docker-compose.prod.yml; -d to run in background)
docker-compose -f docker-compose.prod.yml up --build
## -d to run in background and do not block the current terminal
docker-compose -f docker-compose.prod.yml up --build -d