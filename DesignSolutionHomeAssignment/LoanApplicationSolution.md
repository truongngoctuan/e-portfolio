# A Solution for Loan Application

The solution is suggested to use AWS as a cloud provider, including the following services:
* `Loan Management Service`
* `Report Service`
* `Connector Manager` and `Service Connector`, `Service Connector2`

The solution is designed as follows:
![Loan Application Solution](Design%20System%20for%20Loan%20Applications.webp)

## Loan Management Service

This service could provide a solution for those requirements regarding submitting a loan application (requirements 1, 2, 5, and 12 audit). The loan application is a simple form that submits to the server. And the server needs to store all the events generated in the process of the loan application for audit. This leads to designing a backend `Loan Management Service` using the Event Sourcing pattern.

* The CQRS pattern is used with Event Sourcing to handle each event and save the latest status into the object `loan_applications`.
* The events are stored in a database table `events` with columns: `id`, `event`, `data`.
* The service uses C# with Entity Framework Core, SQL.
* Clean architecture is used to separate the business logic from the infrastructure and can be unit tested.

Since the application stores payment information, it should be obligated to follow the PCI DSS standard. The database should be encrypted. The data that transfers to `service connector 2` should be encrypted as well.

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
    ...
    PRIMARY KEY (id)
);
```

## `Report Service`

The `Report Service` is responsible for generating reports for the loan applications. The purpose of this service is to provide data before submitting it to the external system, assuming that it could take a long time to process. This will help to solve requirement 11 to submit loan applications to the bank.

Considering the result of the report is like a `Read` stream, the submission of the report to the bank would be done fast and leave no room for error. If there is an error, it can be discovered and fixed before the submission.

The report can be validated by a human before sending it to the external system. I assume that this would be a necessary feature for the future.

## `Connector Manager` and `Service Connector`, `Service Connector2`

Those services are responsible for communicating with external systems for requirements 3 and 11: credit check and bank submission.

To ensure the communication between the internal system and external system, a retry and throttling mechanism is needed. This leads to designing a backend using the Circuit Breaker pattern for the `Connector Manager` service. The Service Connector is a microservice that is responsible for communicating with the external system, how it is communicated is controlled by the `Connector Manager`.

* Communication between `Loan Management Service` and `Connector Manager` is done asynchronously using a message queue. This design also helps for testing with the capability to mock the external system by either mocking the response or simulating the response from the Connector Manager (by developing a separate testing mode and production mode).
* In case of failure, the `Connector Manager` will retry the request to the external system with a delay and a maximum number of retries to ensure that the system does not overwhelm the external system.
* The communication between `Connector Manager` and `Service Connector` is done asynchronously using a message queue. This helps to decouple the implementation of new connectors without affecting the `Connector Manager`.

The `Service Connector`, `Service Connector2` responsible for communicating with the external system is a microservice that has different security and standards in the financial industry and can be easily implemented using an appropriate technology stack. For example, using Java with security packages dedicated to this task while the `Loan Management Service` can use another technical stack focused on performance.

The connector services have a different subnet than the `Loan Management Service` to ensure security and isolation, with no possibility of accessing sensitive/payment data.

## Email Service

This is an independent service that is triggered by an event from a message queue. The message queue is used to decouple the communication between components. The `Email Service` is responsible for sending an email to the applicant after the submission.

The `Email Service` is built as a Lambda function for simplicity and cost-effectiveness.

## Deployment

The solution is suggested to be deployed on AWS and use Terraform to manage the infrastructure so it can be automated. Another reason is to ensure the transparency of the financial industry and the ability to audit the infrastructure in addition to the data.

Each service mentioned above can be implemented and dockerized and deployed to AWS ECS.

## Development and Testing

The development for each service can be done independently and even with different tech stacks. The trade-off is the complexity of the system, monitoring, and debugging.

The solution is divided into microservices, each service can be developed and tested independently. The `Loan Management Service` can be tested using unit tests, integration tests (with `Connector Manager` simulator), and end-to-end tests. Each `Service Connector` can be tested with `Connector Manager` separately.
