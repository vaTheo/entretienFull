import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { Fleet } from '../../Domain/fleet';
import { Vehicle } from '../../Domain/vehicle';
import { Location } from '../../Domain/location';
import { RegisterVehicleCommand, RegisterVehicleCommandHandler } from '../../App/registerVehicleCommand';
import { ParkVehicleCommand, ParkVehicleCommandHandler } from '../../App/parkVehicleCommand';
import { FleetRepository } from '../../Infra/fleetRepository';
import * as fs from 'fs-extra';
import * as path from 'path';

let fleet: Fleet;
let anotherFleet: Fleet;
let vehicle: Vehicle;
let location: Location;
let fleetRepository: FleetRepository;
let registerVehicleCommandHandler: RegisterVehicleCommandHandler;
let parkVehicleCommandHandler: ParkVehicleCommandHandler;
let error: Error | null = null;

const FLEET1_NAME: string = 'fleet-1';
const FLEET2_NAME: string = 'fleet-2';
const VEHICLE1_NAME: string = 'Vehicle-1';
const VEHICLE2_NAME: string = 'Vehicle-2';
const LATITUDE: number = 15;
const LONGITUDE: number = 150;

const TEST_JSON_PATH = path.join(__dirname, 'fleets.json');

BeforeAll(async () => {
  // Ensure we start with a clean state
  await fs.remove(TEST_JSON_PATH);
});

AfterAll(async () => {
  // Clean up after all tests
  await fs.remove(TEST_JSON_PATH);
});

Given('my fleet', async function () {
  fleetRepository = new FleetRepository();
  fleet = new Fleet(FLEET1_NAME);
  await fleetRepository.save(fleet);
  registerVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
  parkVehicleCommandHandler = new ParkVehicleCommandHandler(fleetRepository);
});

Given('the fleet of another user', async function () {
  anotherFleet = new Fleet(FLEET2_NAME);
  await fleetRepository.save(anotherFleet);
});

Given('a vehicle', function () {
  vehicle = new Vehicle(VEHICLE1_NAME);
});

Given('I have registered this vehicle into my fleet', async function () {
  const command = new RegisterVehicleCommand(fleet.Id, vehicle.VehicleName);
  await registerVehicleCommandHandler.handle(command);
});

Given("this vehicle has been registered into the other user's fleet", async function () {
  const command = new RegisterVehicleCommand(anotherFleet.Id, vehicle.VehicleName);
  await registerVehicleCommandHandler.handle(command);
});

When('I register this vehicle into my fleet', async function () {
  const command = new RegisterVehicleCommand(fleet.Id, vehicle.VehicleName);
  await registerVehicleCommandHandler.handle(command);
});

When('I try to register this vehicle into my fleet', async function () {
  try {
    const command = new RegisterVehicleCommand(fleet.Id, vehicle.VehicleName);
    await registerVehicleCommandHandler.handle(command);
  } catch (e) {
    error = e as Error;
  }
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  const updatedFleet = await fleetRepository.retrieveId(fleet.Id);
  assert(updatedFleet?.hasVehicle(vehicle.VehicleName));
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert(error instanceof Error);
  assert(error.message.includes('This vehicle is already registered in this fleet'));
});

Given('a location', function () {
  location = new Location(LATITUDE, LONGITUDE);
});

Given('my vehicle has been parked into this location', async function () {
  const command = new ParkVehicleCommand(
    fleet.Id,
    vehicle.VehicleName,
    location.Latitude,
    location.Longitude,
  );
  await parkVehicleCommandHandler.handle(command);
});

When('I park my vehicle at this location', async function () {
  const command = new ParkVehicleCommand(
    fleet.Id,
    vehicle.VehicleName,
    location.Latitude,
    location.Longitude,
  );
  await parkVehicleCommandHandler.handle(command);
});

When('I try to park my vehicle at this location', async function () {
  try {
    const command = new ParkVehicleCommand(
      fleet.Id,
      vehicle.VehicleName,
      location.Latitude,
      location.Longitude,
    );
    await parkVehicleCommandHandler.handle(command);
  } catch (e) {
    error = e as Error;
  }
});

Then('the known location of my vehicle should verify this location', async function () {
  const updatedFleet = await fleetRepository.retrieveId(fleet.Id);
  const updatedVehicle = updatedFleet?.retrieveVehicle(vehicle.VehicleName);
  assert(updatedVehicle?.VehicleLocation?.isSameLocation(location));
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert(error instanceof Error);
  assert(error.message.includes('The vehicle is already parked at this location'));
});
