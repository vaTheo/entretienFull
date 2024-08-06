import { Fleet } from '../Domain/fleet';
import { Vehicle } from '../Domain/vehicle';
import { Location } from '../Domain/location';
import * as fs from 'fs-extra';
import * as path from 'path';

interface SerializedFleet {
  id: string;
  vehicles: {
    [name: string]: {
      name: string;
      location: { latitude: number; longitude: number } | null;
    };
  };
}

export class FleetRepository {
  private fleets: Map<string, Fleet> = new Map();
  private readonly filePath: string = path.join(__dirname, '../Database/fleets.json');

  constructor() {
    this.loadFleets();
  }

  private async loadFleets() {
    try {
      if (await fs.pathExists(this.filePath)) {
        const data: { [id: string]: SerializedFleet } = await fs.readJson(this.filePath);
        this.fleets = new Map(
          Object.entries(data).map(([id, serializedFleet]) => {
            const fleet = new Fleet(id);
            Object.values(serializedFleet.vehicles).forEach((vehicleData) => {
              const vehicle = new Vehicle(vehicleData.name);
              if (vehicleData.location) {
                const location = new Location(vehicleData.location.latitude, vehicleData.location.longitude);
                vehicle.parkVehicle(location);
              }
              fleet.registerVehicle(vehicle);
            });
            return [id, fleet];
          })
        );
      }
    } catch (error) {
      console.error('Error loading fleets:', error);
    }
  }

  private async saveFleets(): Promise<void> {
    try {
      const serializedFleets: { [id: string]: SerializedFleet } = {};
      this.fleets.forEach((fleet, id) => {
        const serializedFleet: SerializedFleet = {
          id: fleet.Id,
          vehicles: {},
        };
        fleet['vehicles'].forEach((vehicle, name) => {
          serializedFleet.vehicles[name] = {
            name: vehicle.VehicleName,
            location: vehicle.VehicleLocation
              ? {
                  latitude: vehicle.VehicleLocation.Latitude,
                  longitude: vehicle.VehicleLocation.Longitude,
                }
              : null,
          };
        });
        serializedFleets[id] = serializedFleet;
      });
      await fs.writeJson(this.filePath, serializedFleets, { spaces: 2 });
    } catch (error) {
      console.error('Error saving fleets:', error);
    }
  }

  async retrieveId(id: string): Promise<Fleet | null> {
    await this.loadFleets();
    return this.fleets.get(id) || null;
  }

  async save(fleet: Fleet): Promise<void> {
    await this.loadFleets();
    this.fleets.set(fleet.Id, fleet);
    await this.saveFleets();
  }

  async exist(id: string): Promise<boolean> {
    await this.loadFleets();
    return this.fleets.has(id);
  }
}