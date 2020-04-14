/* Created 3:00 PM 3/19/2020 */

// This is a test user until we can read users from the database

var personPhoto = "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/32412214_1677014109085640_5046637897659187200_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=ssOHO73Nvn4AX8wOSzn&_nc_ht=scontent-lga3-1.xx&oh=0a6e436d50355a41ab851ea7168add5d&oe=5EB5C552";
var personDisplay = new PersonDisplay(personPhoto, "", "Beck", "", "Peterson", "", "22", "", "Lowell", "College student with a cute pup waiting at home for me");
var photos = new Array();
photos.push(personPhoto);
photos.push(personPhoto);
photos.push(personPhoto);
photos.push(personPhoto);
var dogsInfo = new DogsInfo();
var contactInfo = new ContactInfo("beckpeterson2016@gmail.com", "19789953608");
var addressInfo = new AddressInfo("102 Martin St", "Lowell", "MA", "01854");
var postsInfo = new PostsInfo();
postsInfo.array.push(new Post("Hey, this is a test post to my wall"));
postsInfo.array.push(new Post("This is a second post about my dog"));
var info = new Map();
info.set(dogsInfo.title, dogsInfo); 
info.set(contactInfo.title, contactInfo);
info.set(addressInfo.title, addressInfo);
info.set(postsInfo.title, postsInfo);
window.testPerson = new Person(personDisplay, photos, info);

var dogPhoto = "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/1175746_528238690629860_1388233212_n.jpg?_nc_cat=104&_nc_sid=110474&_nc_ohc=kz3b-Wv0-VIAX-iifDi&_nc_ht=scontent-lga3-1.xx&oh=5366ba467a859d3fb646db3ce9b6422b&oe=5EB29C45";
var dogDisplay = new DogDisplay(dogPhoto, "", "Lola", "", "", "", "Female", "Havenese", "5", "North Reading", "An energetic gal who loves to play and cuddle");
var dogPhotos = new Array();
var healthInfo = new HealthInfo();
var breedingInfo = new BreedingInfo();
var sellingInfo = new SellingInfo();
var dogInfo = new Map();
dogInfo.set(healthInfo.title, healthInfo);
dogInfo.set(breedingInfo.title, breedingInfo);
dogInfo.set(sellingInfo.title, sellingInfo);
var dog = new Dog(window.testPerson, dogDisplay, dogPhotos, dogInfo);
window.testPerson.info.get("Dogs").map.set(dog.display.firstName, dog);

window.testPerson.info.get("Dogs").map.set("Test", new Dog(window.testPerson, new DogDisplay(null, "", "Test")));

window.loggedInPerson = window.testPerson;

// End of test user

function Account(display = null, photos = null, info = null, parent = null) {
    this.display = display != null ? display : new Display();
    this.photos = photos != null ? photos : new Array();
    this.info = info != null ? info : new Map();
    this.parent = parent;
}

function Display(photo = null, prefix = "", firstName = "", middleName = "", lastName = "", suffix = "", firstLine = "", secondLine = "", thirdLine = "", fourthLine = "", summary = "") {
    this.photo = photo;
    this.prefix = prefix;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;
    this.firstLine = firstLine;
    this.secondLine = secondLine;
    this.thirdLine = thirdLine;
    this.fourthLine = fourthLine;
    this.summary = summary;
}

function Photos() {

}

function Info(title = "", visibility = "private") {
    this.title = title;
    this.visibility = visibility;
    this.map = new Map();
}

function Settings() {

}

function Person(personDisplay = null, photos = null, info = null) {
    Account.call(this, personDisplay, photos, info, null);
}

function PersonDisplay(photo = null, prefix = "", firstName = "", middleName = "", lastName = "", suffix = "", age = "", organisation = "", location = "", summary = "") {
    Display.call(this, photo, prefix, firstName, middleName, lastName, suffix, firstName + " " + lastName, age, location, organisation, summary);
}

function Dog(owner, dogDisplay = null, photos = null, info = null) {
    Account.call(this, dogDisplay, photos, info, owner);
}

function DogDisplay(photo = null, prefix = "", firstName = "", middleName = "", lastName = "", suffix = "", gender = "", breed = "", age = "", location = "", summary = "") {
    Display.call(this, photo, prefix, firstName, middleName, lastName, suffix, firstName + " " + lastName, gender, breed + ", " + age, location, summary);
}

function Post(text = "", photo = null, file = null) {
    this.text = text;
    this.photo = photo;
    this.file = file;
}

////
/// Private Infos
//

function PostsInfo() {
    Info.call(this, "Posts", "private");
    this.array = new Array();
}

function DogsInfo() {
    Info.call(this, "Dogs", "private");
}

////
/// Protected Infos
//

function ContactInfo(email, phone) {
    Info.call(this, "Contact", "protected");
    this.map.set("Email", email);
    this.map.set("Phone", phone.replace(/\D/g, "").replace(/^(\d*)(\d{3})(\d{3})(\d{4})$/, "$1($2)$3-$4"));
}

function AddressInfo(address, city, state, zip) {
    Info.call(this, "Address", "protected");
    this.map.set("Address", address);
    this.map.set("City", city);
    this.map.set("State", state);
    this.map.set("Zip", zip);
}

////
/// Public Infos
//

function GeneralDogInfo(breeds, color, pattern, height, weight) {
    Info.call(this, "General", "public");
    this.map.set("Breeds", breeds);
    this.map.set("Color", color);
    this.map.set("Pattern", pattern);
    this.map.set("Height", height);
    this.map.set("Weight", weight);
}

function OrganizationInfo(oranization) {
    Info.call(this, "Organization", "public");
    this.map.set("Organization", organization);
}

function HealthInfo(disease, injury, vaccines) {
    Info.call(this, "Health", "public");
    this.map.set("Disease", disease);
    this.map.set("Injury", injury);
    this.map.set("Vaccines", vaccines);
}

function BreedingInfo(breeding) {
    Info.call(this, "Breeding", "public");
    this.map.set("Breeding", breeding);
}

function SellingInfo(selling) {
    Info.call(this, "Selling", "public");
    this.map.set("Selling", selling);
}