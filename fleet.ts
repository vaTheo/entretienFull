#!/usr/bin/env node

import { program } from 'commander';
import { FleetRepository } from './src/BoilerPlate/Infra/fleetRepository';
import { Fleet } from './src/BoilerPlate/Domain/fleet';
import { RegisterVehicleCommand, RegisterVehicleCommandHandler } from './src/BoilerPlate/App/registerVehicleCommand';
import { ParkVehicleCommand, ParkVehicleCommandHandler } from './src/BoilerPlate/App/parkVehicleCommand';

const fleetRepository = new FleetRepository();

program.version('1.0.0').description('Fleet management CLI');

program
  .command('create <fleetId>')
  .description('Create a new fleet')
  .action(async (userId: string) => {
    const fleet = new Fleet(userId);
    await fleetRepository.save(fleet);
    console.log(fleet.Id);
  });

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle to a fleet')
  .action(async (fleetId: string, vehiclePlateNumber: string) => {
    const command = new RegisterVehicleCommand(fleetId, vehiclePlateNumber);
    const handler = new RegisterVehicleCommandHandler(fleetRepository);
    await handler.handle(command);
    console.log('Vehicle registered successfully');
  });

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
  .description('Localize a vehicle in a fleet')
  .action(async (fleetId: string, vehiclePlateNumber: string, lat: string, lng: string, alt?: string) => {
    const command = new ParkVehicleCommand(fleetId, vehiclePlateNumber, parseFloat(lat), parseFloat(lng));
    const handler = new ParkVehicleCommandHandler(fleetRepository);
    await handler.handle(command);
    console.log('Vehicle localized successfully');
  });

program.parse(process.argv);
