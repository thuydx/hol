# workload

The workload template for the dev environment.

1. run prepare-data-folder.sh

2. clone project to data/app folder.

Login to docker
```
docker login -u <username>
```

Build and run the containers
```
docker-compose up -d --build
```

Remove the containers
```
docker-compose down -v
```

Remove the images
```
docker image prune -af
```

List all images
```
docker image ls
```

List all containers (running + stopped)
```
docker ps -a
```

Show only container names:
```
docker ps --format "{{.Names}}"
```

Show only image IDs:
```
docker images -q
```

Inspect a specific container:
```
docker inspect <container_name_or_id>
```

```
docker stop <container_name_or_id>
```

```
docker rm <container_name_or_id>
docker rmi <image_name_or_id>
docker rmi -f <image_name_or_id>
```