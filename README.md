# E-COMMERCE

## Server

### Authentication & Authorization
|Route           |HTTP   |Description                                           |
|----------------|-------|------------------------------------------------------|
|`/custSignup`   | POST  | Customer sign up                                     |
|`/sellSignup`   | POST  | Seller sign up                                       |
|`/signin`       | POST  | Customer/Seller sign in to get a token               |

### List of admin routes:
|Route                      |HTTP |Description                       |
|---------------------------|-----|----------------------------------|
|`/dashboard/customers/`    | GET | Get all users (admin only)       |
|`/dashboard/transactions/` | GET | Get all transactions (admin only)|
|`/dashboard/books/`        | GET | Get all books (admin only)       |

### List of customers routes:
|Route               |HTTP   |Description                                           |
|--------------------|-------|------------------------------------------------------|
|`/api/customers/:id`| GET   | Get a customer/seller (authenticated user only)      |
|`/api/customers/:id`| DELETE| Delete a customer/seller (authenticated user only)  |
|`/api/customers/:id`| PUT   | Update customer/seller info (authenticated user only)|

### List of books routes:
|Route           |HTTP   |Description                 |
|----------------|-------|----------------------------|
|`/api/books/`   | GET   | Get all books              |
|`/api/books/:id`| GET   | Get a book                 |
|`/api/books/`   | POST  | Create a book (seller only)|
|`/api/books/:id`| DELETE| Delete a book (seller only)|
|`/api/books/:id`| PUT   | Update a book (seller only)|

## Client
