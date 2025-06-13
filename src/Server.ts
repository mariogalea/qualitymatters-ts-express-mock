// src/Server.ts
import express, { Express, Request, Response } from 'express';

/**
 * @author
 * Mock Booking API Server
 */
export class Server {
  private readonly app: Express;
  private readonly port: number;

  constructor(port: number = 8080) {
    this.port = port;
    this.app = express();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get('/bookings', this.handleGetAllBookings);
  }

  private handleGetAllBookings(_req: Request, res: Response): void {
    res.json({
      "_embedded": {
        "bookingList": [
          {
            "id": 1,
            "firstName": "Mario",
            "lastName": "Galea",
            "_links": {
              "selfLink": {
                "href": "http://localhost:8080/bookings/1"
              },
              "bookingsLink": {
                "href": "http://localhost:8080/bookings"
              }
            }
          },
          {
            "id": 2,
            "firstName": "Vincent",
            "lastName": "Vega",
            "_links": {
              "selfLink": {
                "href": "http://localhost:8080/bookings/2"
              },
              "bookingsLink": {
                "href": "http://localhost:8080/bookings"
              }
            }
          },
          {
            "id": 3,
            "firstName": "Jackie",
            "lastName": "Brown",
            "_links": {
              "selfLink": {
                "href": "http://localhost:8080/bookings/3"
              },
              "bookingsLink": {
                "href": "http://localhost:8080/bookings"
              }
            }
          }
        ]
      },
      "_links": {
        "bookingsLink": {
          "href": "http://localhost:8080/bookings"
        }
      }
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Mock Booking API running at http://localhost:${this.port}`);
    });
  }
}
