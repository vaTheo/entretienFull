import { Vehicle } from './vehicle';

/**
 * Fleet class
 * A collection a distinct vehicles.
 */
export class Fleet {
  private vehicles: Map<string, Vehicle> = new Map();

  constructor(private readonly id: string) {
    this.validation();
  }
  validation() {
    if (!this.id) {
      throw new Error('Fleet id cannot be empty');
    }
  }

  get Id(): string {
    return this.id;
  }

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.has(vehicle.VehicleName)) {
      throw new Error('This vehicle is already registered in this fleet');
    }
    this.vehicles.set(vehicle.VehicleName, vehicle);
  }

  hasVehicle(vehicleName: string): boolean {
    return this.vehicles.has(vehicleName);
  }

  retrieveVehicle(vehicleName: string): Vehicle | undefined {
    return this.vehicles.get(vehicleName);
  }
}
