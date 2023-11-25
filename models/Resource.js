class Resource {
    constructor(name, location, description, owner, rating) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.rating = rating;
        this.owner = owner;
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Resource };