/**
 * Booking model with link generators
 */

export class Booking {
  public id: number;
  public firstName: string;
  public lastName: string;
  private port: number;

  constructor(id: number, firstName: string, lastName: string, port: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.port = port;
  }

  public toResponse() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      _links: {
        selfLink: {
          href: `http://localhost:${this.port}/bookings/${this.id}`,
        },
        bookingsLink: {
          href: `http://localhost:${this.port}/bookings`,
        },
      },
    };
  }

  public toPlain() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
