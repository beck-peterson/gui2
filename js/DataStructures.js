/* Created 3:00 PM 3/19/2020 */

var personPhoto = "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/32412214_1677014109085640_5046637897659187200_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=ssOHO73Nvn4AX8wOSzn&_nc_ht=scontent-lga3-1.xx&oh=0a6e436d50355a41ab851ea7168add5d&oe=5EB5C552";
var personDisplay = new PersonDisplay(personPhoto, "", "Beck", "", "Peterson", "", "22", "", "Lowell", "College student with a cute pup waiting at home for me");
var photos = new Array();
var dogsInfo = new DogsInfo();
var contactInfo = new ContactInfo("9789953608", "beckpeterson2016@gmail.com");
var addressInfo = new AddressInfo("102 Martin St", "Lowell", "MA", "01854", "Apartment 2");
var info = new Map();
info.set(dogsInfo.title, dogsInfo);
info.set(contactInfo.title, contactInfo);
info.set(addressInfo.title, addressInfo);
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

function Info(title = "", isPublic = false) {
    this.title = title;
    this.isPublic = isPublic;
}

function Settings() {

}

function Person(personDisplay = null, photos = null, info = null) {
    Account.call(this, personDisplay, photos, info, null);
}

function PersonDisplay(photo = null, prefix = "", firstName = "", middleName = "", lastName = "", suffix = "", age = "", organisation = "", location = "", summary = "") {
    Display.call(this, photo, prefix, firstName, middleName, lastName, suffix, firstName + " " + lastName, age, organisation, location, summary);
}

function Dog(owner, dogDisplay = null, photos = null, info = null) {
    Account.call(this, dogDisplay, photos, info, owner);
}

function DogDisplay(photo = null, prefix = "", firstName = "", middleName = "", lastName = "", suffix = "", gender = "", breed = "", age = "", location = "", summary = "") {
    Display.call(this, photo, prefix, firstName, middleName, lastName, suffix, firstName + " " + lastName, gender, breed + ", " + age, location, summary);
}

function DogsInfo() {
    Info.call(this, "Dogs", true);
    this.map = new Map();
}

function OrganizationInfo() {
    Info.call(this, "Organization", true);
}

function ContactInfo() {
    Info.call(this, "Contact", false);
}

function AddressInfo() {
    Info.call(this, "Address", false);
}

function HealthInfo() {
    Info.call(this, "Health", true);
}

function BreedingInfo() {
    Info.call(this, "Breeding", true);
}

function SellingInfo() {
    Info.call(this, "Selling", true);
}