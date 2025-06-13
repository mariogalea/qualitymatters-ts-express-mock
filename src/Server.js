"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// src/Server.ts
const express_1 = __importDefault(require("express"));
/**
 * @author
 * Mock Booking API Server
 */
class Server {
    constructor(port = 8080) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.get('/bookings', this.handleGetAllBookings);
    }
    handleGetAllBookings(_req, res) {
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
    start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Mock Booking API running at http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
