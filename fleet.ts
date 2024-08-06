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
  .action(async (fleetId: string) => {
    try {
      const fleet = new Fleet(fleetId);
      await fleetRepository.save(fleet);
      console.log(`Fleet created with ID: ${fleet.Id}`);
    } catch (error) {
      console.error('Error creating fleet:', error);
    }
  });

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle to a fleet')
  .action(async (fleetId: string, vehiclePlateNumber: string) => {
    try {
      const command = new RegisterVehicleCommand(fleetId, vehiclePlateNumber);
      const handler = new RegisterVehicleCommandHandler(fleetRepository);
      await handler.handle(command);
      console.log('Vehicle registered successfully');
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  });

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>')
  .description('Localize a vehicle in a fleet')
  .action(async (fleetId: string, vehiclePlateNumber: string, lat: string, lng: string) => {
    try {
      const command = new ParkVehicleCommand(fleetId, vehiclePlateNumber, parseFloat(lat), parseFloat(lng));
      const handler = new ParkVehicleCommandHandler(fleetRepository);
      await handler.handle(command);
      console.log('Vehicle localized successfully');
    } catch (error) {
      console.error('Error localizing vehicle:', error);
    }
  });

program.parse(process.argv);