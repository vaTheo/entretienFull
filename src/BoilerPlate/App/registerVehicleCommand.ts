import { FleetRepository } from '../Infra/fleetRepository';
import { Vehicle } from '../Domain/vehicle';

export class RegisterVehicleCommand {
  constructor(
    public readonly fleetId: string,
    public readonly vehicleName: string,
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

export class RegisterVehicleCommandHandler {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async handle(command: RegisterVehicleCommand) {
    const fleet = await this.fleetRepository.retrieveId(command.fleetId);

    if (!fleet) {
      throw new Error(`Fleet not found : ${command.fleetId}`);
    }

    const vehicle = new Vehicle(command.vehicleName);

    try {
      fleet.registerVehicle(vehicle);
      await this.fleetRepository.save(fleet);
    } catch (e) {
      throw new Error(`Failed to register vehicle: ${e}`);
    }
  }
}
