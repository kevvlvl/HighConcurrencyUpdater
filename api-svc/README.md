# Api-Server

Simple API that accepts a payload to update a customer. We update into a Microsoft SQL server.

## Start the DB using Podman

```shell
podman run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=LocalPass123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

```tsql

create database app
go

create table Customer(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    firstName NVARCHAR(100),
    lastName NVARCHAR(100),
    country NVARCHAR(50),
    rowVersion BIGINT DEFAULT 1
);
```