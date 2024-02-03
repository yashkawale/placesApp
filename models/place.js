class Place {
  constructor(title, address, imageUri, location) {
    (this.title = title),
      (this.address = address),
      (this.imageUri = imageUri),
      (this.location = location),
      (this.id = new Date().toString() + Math.random().toString());
  }
}
