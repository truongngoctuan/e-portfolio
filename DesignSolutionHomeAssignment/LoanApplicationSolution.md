# A Solution for Loan Application

The solution is suggested to use AWS a cloud provider, including the following services:
* `Loan Management Service`
* `Report Service`
* `Connector Manager` and `Service Connector`, `Service Connector2`

The solution is designed as below:
![Loan Application Solution](Design%20System%20for%20Loan%20Applications.webp)

## Loan Management Service

The loan application is a simple form that submit to the server. And the server needs to store all the events generated in the process of loan application for audit. This leads to design a backend `Loan Management Service` using Event Sourcing pattern.

* The CQRS pattern is used with Event Sourcing to handle each event and save the latest status into object `loan_applications`.
* The events are stored in a database table `events` with columns: `id`, `event`, `data`.
* The service use C# with Entity Framework Core, SQL.
* Clean architecture is used to separate the business logic from the infrastructure and can be unit testing.

Since the application store payment information, it should obligate to follow the PCI DSS standard. The database should be encrypted. The data that transfer to `service connector 2` should be encrypted as well.

### Database model

```sql
CREATE TABLE events
(
    id       INT(10) NOT NULL AUTO_INCREMENT,
    event    NVARCHAR(50)   NOT NULL,
    data     JSONB  NOT NULL,
    PRIMARY KEY (id)
);
```

```sql
CREATE TABLE loan_applications
(
    id        INT(10) NOT NULL AUTO_INCREMENT,
    user_id   INT NOT NULL,
    amount    DECIMAL(10, 2) NOT NULL,
    status    NVARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    approval_status NVARCHAR(50) NOT NULL,
    approved_by INT,
    PRIMARY KEY (id)
);
```

## `Report Service`

The `Report Service` is responsible for generating reports for the loan applications. The purpose for this service is to provide data before submit to the external system, assuming that it could take long time to process.

Considering the result of the report is like a `Read` stream, the submission of the report to the bank would be done fast and leave no room for error. If there is an error, it can be discovered and fixed before the submission.

The report can be validated by a human before sending to the external system. I assume that this would be a necessary feature for the future.

## `Connector Manager` and `Service Connector`, `Service Connector2`

To ensure the communication between internal system and external system, a retry and throttling mechanism is needed. This leads to design a backend using Circuit Breaker pattern for `Connector Manager` service. The Service Connector is a microservice that is responsible for communicating with external system, how it is communicated is controlled by the `Connector Manager`.

* Communication between `Loan Management Service` and `Connector Manager` is done assynchronously using message queue. This design is also help for testing with capability to mock the external system by either moq the response or simulate the response from Connector Manager (by develop a separated testing mode and production mode).
* In case of failure, the `Connector Manager` will retry the request to the external system with a delay and a maximum number of retries ensure that the system is not overwhelm the external system.
* The communication between `Connector Manager` and `Service Connector` is done assynchronously using message queue. This helps to decouple the implementation of new connectors without affecting the `Connector Manager`.

The `Service Connector`, `Service Connector2` responsible for communicating with external system is a microservice that have different security and standards in financial industry can can be easily to implement using appropriate technology stack. For example: using Java with security packages dedicated for this task while the `Loan Management Service` can use another technical stack focus on performance.

The connector services have different subnet with the `Loan Management Service` to ensure the security and isolation, no possibility of accessing sensitive/payment data.

## Email Service

This is an independent service that is triggered by an event from a message queue. The message queue is used to decouple the communication between components. The `Email Service` is responsible for sending an email to the applicant after the submission.

The `Email Service` is build as a Lambda function for simplicity and cost-effective.

## Deployment

The solution is suggested to deploy on AWS and use Terraform to manage the infrastructure so it can be automated. Another reason is to ensure the transparency of the financial industry and the ability to audit the infrastructure in addition to the data.

## Developmnent and Testing

The development for each service can be done independently and even with difference tech stacks. The trade-off is the complexity of the system, monitoring and debugging.

The solution divided into microservices, each service can be developed and tested independently. The `Loan Management Service` can be tested using unit tests, integration tests (with `Connector Manager` simulator) and end-to-end tests. Each `Service Connector` can be tested with `Connector Manager` separatedly.