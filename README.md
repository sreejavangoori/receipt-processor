# Receipt Processor

## Startup Instructions

This application is developed in JavaScript using Node.js and Express.
The repository includes a Dockerfile.
Follow the steps below to set up the Docker container and run the application after cloning the repository.

1. Build the Docker image:
   ```sh
   docker build -t receipt-processor:v1 .
   ```
2. Run the Docker container:
   ```sh
   docker run -p 3000:3000 receipt-processor
   ```

The server will be running on `localhost:3000`. A Postman collection is included for easier testing. After successfully completing the `POST` request, use the generated UUID in the response for the `GET` request.

OR

1. Run the Docker container:
   ```
   docker run -p 3000:3000 sreeja08/receipt-processor:v1
   ```

## API Endpoints

- **GET** : `localhost:3000/receipts/:receiptId/points`
- **POST**: `localhost:3000/receipts/process`

### POST JSON Body Example

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },
    {
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },
    {
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },
    {
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },
    {
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```
