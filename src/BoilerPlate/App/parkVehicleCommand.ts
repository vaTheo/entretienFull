import { FleetRepository } from '../Infra/fleetRepository';
import { Location } from '../Domain/location';

export class ParkVehicleCommand {
  constructor(
    public readonly fleetId: string,
    public readonly vehicleName: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {
    this.validation();
  }

  validation() {
    if (!this.fleetId) {
      throw new Error('Fleet id cannot be empty');
    }
    if (!this.vehicleName) {
      throw new Error('Vehicle name cannot be empty');
    }
  }
}

export class ParkVehicleCommandHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async handle(command: ParkVehicleCommand) {
    const fleet = await this.fleetRepository.retrieveId(command.fleetId);

    if (!fleet) {
      throw new Error(`Fleet not found: ${command.fleetId}`);
    }

    const vehicle = fleet.retrieveVehicle(command.vehicleName);

    if (!vehicle) {
      throw new Error(`Vehicle not found in fleet: ${command.vehicleName}`);
    }

    const location = new Location(command.latitude, command.longitude);

    try {
      vehicle.parkVehicle(location);
      await this.fleetRepository.save(fleet);
    } catch (e) {
      throw new Error(`Failed to park vehicle: ${e}`);
    }
  }
}
