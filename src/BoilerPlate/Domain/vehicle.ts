import { Location } from "./location";

export class Vehicle {
  constructor(private vehicleName: string) {
    this.Validation();
  }

  private location: Location | null = null;


  Validation() {
    if (!this.vehicleName) {
      throw new Error('Vehicle name cannot be empty');
    }
  }
  //Vehicle name methods
  get VehicleName(): string {
    return this.vehicleName;
  }
  set VehicleName(name: string) {
    if (!name) {
      throw new Error('Name cannot be empty');
    }
    this.vehicleName = name;
  }

  //Vehicle location methods
  get VehicleLocation(): Location | null {
    return this.location;
  }
  parkVehicle(location: Location) {
    if (!location) {
      throw new Error('Location cannot be empty');
    }
    if (this.location && this.location.isSameLocation(location)) {
      throw new Error('The vehicle is already parked at this location: ' + location.Coordinate);
    }
    this.location = location;
  }
}
