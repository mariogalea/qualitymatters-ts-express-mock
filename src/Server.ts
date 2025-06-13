/**
 * @author 
 */

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import basicAuth from 'basic-auth';
import { Booking } from './models/Booking';

export class Server {
  private app: Application;
  private port: number;
  private bookings: Booking[];

  constructor(port: number = 8080) {
    this.app = express();
    this.port = port;
    this.bookings = this.seedBookings();

    this.configureMiddleware();
    this.defineRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(bodyParser.json());
  }

  private authenticate(req: Request, res: Response): boolean {
    const credentials = basicAuth(req);
    if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'secret') {
      res.status(401).json({ error: 'Unauthorized' });
      return false;
    }
    return true;
  }

  private defineRoutes(): void {
    this.app.get('/bookings', (req: Request, res: Response) => {
      if (!this.authenticate(req, res)) return;

      const bookingList = this.bookings.map(booking => booking.toResponse());
      const response = {
        _embedded: { bookingList },
        _links: {
          bookingsLink: {
            href: `http://localhost:${this.port}/bookings`,
          },
        },
      };
      res.json(response);
    });

    this.app.get('/bookings/:id', (req: Request, res: Response) => {
      if (!this.authenticate(req, res)) return;

      const id = parseInt(req.params.id, 10);
      const booking = this.bookings.find(b => b.id === id);
      if (!booking) {
        res.status(404).json({ error: `Booking with ID ${id} not found` });
        return;
      }

      res.json(booking.toResponse());
    });

    this.app.post('/bookings/new', (req: Request, res: Response) => {
      if (!this.authenticate(req, res)) return;

      const { firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        res.status(400).json({ error: 'Missing firstName or lastName' });
        return;
      }

      const id = this.bookings.length + 1;
      const booking = new Booking(id, firstName, lastName, this.port);
      this.bookings.push(booking);
      res.json(booking.toPlain());
    });

    this.app.put('/bookings/update/:id', (req: Request, res: Response) => {
      if (!this.authenticate(req, res)) return;

      const id = parseInt(req.params.id, 10);
      const booking = this.bookings.find(b => b.id === id);

      if (!booking) {
        res.status(404).json({ error: `Booking with ID ${id} not found` });
        return;
      }

      const { firstName, lastName } = req.body;
      if (firstName) booking.firstName = firstName;
      if (lastName) booking.lastName = lastName;

      res.json(booking.toPlain());
    });
  }

  private seedBookings(): Booking[] {
    return [
      new Booking(1, 'Mario', 'Galea', this.port),
      new Booking(2, 'Vincent', 'Vega', this.port),
      new Booking(3, 'Jackie', 'Brown', this.port),
    ];
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Mock server running at http://localhost:${this.port}`);
    });
  }
}
