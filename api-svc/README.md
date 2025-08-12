# Api-Server

Simple API that accepts a payload to update a customer. We update into a Microsoft SQL server.

## Start the DB using Podman

```shell
podman run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=LocalPass123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

```tsql

create database app
go

alter database app
    set ALLOW_SNAPSHOT_ISOLATION on;

create table Customer(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    firstName NVARCHAR(100),
    lastName NVARCHAR(100),
    country NVARCHAR(50),
    rowVersion BIGINT DEFAULT 1
);
```

## Endpoints

### Get Customer

```shell
curl localhost:3000/api/customer/1
```

### Create a customer

```shell
curl -X POST localhost:3000/api/customer \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Kev", "lastName": "Power", "country": "Canada"}'
```

### Update a customer

```shell
curl -X PUT localhost:3000/api/customer/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Kev", "lastName": "SUPER POWER", "country": "Canada", "version": "1"}'
```
