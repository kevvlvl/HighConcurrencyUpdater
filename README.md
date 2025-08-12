# High Concurrency Updater

A simple typescript example of how to implement optimistic locking to manage scenarios of concurrency.

The example uses a MSSQL database, but the concept is also applicable to any RDBMS or NoSQL. The client `api-client` calls the server using concurrent calls with axios for concurrency simulation.