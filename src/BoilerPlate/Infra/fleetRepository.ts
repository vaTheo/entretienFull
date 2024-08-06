import { Fleet } from '../Domain/fleet';

export class FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  async retrieveId(id: string): Promise<Fleet | null> {
    return this.fleets.get(id) || null;
  }

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.Id, fleet);
  }

  async exist(id: string): Promise<boolean> {
    return this.fleets.has(id);
  }
}
