// import { RegisterVehicleHandler } from "./App/registerVehicle";
// import { Fleet } from "./Domain/fleet";
// import { FleetRepository } from "./Infra/fleetRepository";

import { Fleet } from "./Domain/fleet";
import { Location } from "./Domain/location";
import { Vehicle } from "./Domain/vehicle";

// async function main() {
//     // Setup
//     const fleetRepository = new FleetRepository();
//     const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);
  
//     // Create a fleet first (assuming you have a method for this)
//     const fleet = new Fleet('fleet123');
//     await fleetRepository.save(fleet);
  
//     // Now try to register a vehicle
//     try {
//       await registerVehicleHandler.execute('fleet123', 'ABC123', 'Parking Lot A');
//       console.log('Vehicle registered successfully');
//     } catch (e) {
//       console.error('Error registering vehicle:', e);
//     }
  
//     // Verify the vehicle was added
//     const updatedFleet = await fleetRepository.findById('fleet123');
//     console.log('Updated fleet:', updatedFleet);
//   }
  
//   main().catch(console.error);




// src/test-script.ts

// Create a new fleet
const myFleet = new Fleet('fleet-001');
console.log(`Created fleet with ID: ${myFleet.Id}`);

// Create a new vehicle
const myCar = new Vehicle('Car-001');
console.log(`Created vehicle with name: ${myCar.VehicleName}`);

// Register the vehicle in the fleet
try {
  myFleet.registerVehicle(myCar);
  console.log(`Vehicle ${myCar.VehicleName} registered in fleet ${myFleet.Id}`);
} catch (error) {
  console.error(`Failed to register vehicle: ${error}`);
}

// Create a location
const parkingLocation = new Location(48.8566, 2.3522); // Paris coordinates
console.log(`Created location: ${parkingLocation.toString()}`);

// Park the vehicle at the location
try {
  myCar.parkVehicle(parkingLocation);
  console.log(`Vehicle ${myCar.VehicleName} parked at location ${parkingLocation.toString()}`);
} catch (error) {
  console.error(`Failed to park vehicle: ${error}`);
}

// Verify the vehicle's location
console.log(`Vehicle ${myCar.VehicleName} location: ${myCar.VehicleLocation?.toString()}`);

// Try to park the vehicle at the same location again
try {
  myCar.parkVehicle(parkingLocation);
} catch (error) {
  console.log(`Attempted to park at the same location: ${error}`);
}

// Verify the fleet's vehicle count
// console.log(`Number of vehicles in fleet: ${myFleet.VehicleCount}`);

// Try to register the same vehicle again
try {
  myFleet.registerVehicle(myCar);
} catch (error) {
  console.log(`Attempted to register the same vehicle again: ${error}`);
}