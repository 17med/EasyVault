# EasyVault

EasyVault is a self-contained NoSQL database system that operates using Docker. It offers a flexible and efficient way to manage data without requiring external database systems.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Self-Contained**: EasyVault operates entirely within Docker, simplifying deployment and management.
- **Schema-less**: Supports a flexible, schema-less data model.
- **High Performance**: Designed for high-speed operations with efficient data handling.
- **Ease of Use**: Minimal setup required, with Docker handling the environment.

## Installation

To get started with EasyVault, you need Docker installed on your system. Follow these steps:

### Prerequisites

- **Docker**: Ensure Docker is installed on your machine. You can download it from [Docker's official site](https://hub.docker.com/r/17med/easyvaultdb).
- **our website**:[Here](https://17med.github.io/EasyVaultDB/)

### Steps

1. **Pull the Docker Image**

   ```bash
   docker pull 17med/easyvaultdb
   ```

2. **Run the Docker Container**

   ```bash
   docker run -d -p 51111:51111 --name easyvaultdb 17med/easyvaultdb
   ```

   This command will run EasyVault in a detached mode and map port 51111 from the container to port 51111 on your host.

3. **Verify the Container is Running**

   ```bash
   docker ps
   ```

   You should see the `easyvaultdb` container running.

## Configuration

Configuration options can be set using environment variables when running the Docker container. Example:

```bash
docker run -d -p 51111:51111 \
  --name easyvaultdb 17med/easyvaultdb
```
