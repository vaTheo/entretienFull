/**
 * Location class
 * A way to localize on planet earth, like GPS coordinates for example.
 */
export class Location {
  constructor(
    private latitude: number,
    private longitude: number,
  ) {
    this.Validation();
  }

  private Validation() {
    if (!this.latitude && !this.longitude) {
      throw new Error('Location cannot be empty');
    }
    if (this.latitude <= -90 || this.latitude >= 90) {
      throw new Error('Latitude must be between -90 and 90');
    }
    if (this.longitude <= -180 || this.longitude >= 180) {
      throw new Error('Longitude must be between -180 and 180');
    }
  }

  get Latitude(): number {
    return this.latitude;
  }

  get Longitude(): number {
    return this.longitude;
  }

  get Coordinate(): string {
    return `${this.latitude},${this.longitude}`;
  }

  isSameLocation(newLocation: Location): boolean {
    return this.latitude === newLocation.latitude && this.longitude === newLocation.longitude;
  }
}
