export class Place {
  constructor(title, imageUri, location) {
    (this.title = title),
      (this.imageUri = imageUri),
      (this.location = {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
      (this.address = location.address),
      (this.id = new Date().toString() + Math.random().toString());
  }
}
