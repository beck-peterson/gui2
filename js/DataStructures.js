/* Created 3:00 PM 3/19/2020 */

var generalInfo = new PublicInfo("Lola", "", "I love to run and play!", "Havenese", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDGYBmx5kmMtX8ONMDrT3fl_joH_6844jDXwqHv5pNa1QqTlaS");
var healthInfo = new HealthInfo();
var breedingInfo = new BreedingInfo();
var sellingInfo = new SellingInfo();
var dog = new Dog(generalInfo, healthInfo, breedingInfo, sellingInfo);
var publicInfo = new PublicInfo("Cesar", "Milan", "I train dogs when the owners can't", "Dog Whisperer", "https://www.gstatic.com/tv/thumb/persons/503118/503118_v9_ba.jpg");
var privateInfo = new PrivateInfo("po box 7356, Hollywood CA", "14638547395", "thedogwhisperer@discory.org");
var accountInfo = new AccountInfo();
var personSettings = new PersonSettings(true, true);
var pictures = new Array("https://www.gstatic.com/tv/thumb/persons/503118/503118_v9_ba.jpg");
var dogs = new Array(dog);
window.testPerson = new Person(publicInfo, privateInfo, accountInfo, personSettings, pictures, dogs);

function Person(publicInfo = null, privateInfo = null, accountInfo = null, personSettings = null, pictures = null, dogs = null) {
	this.publicInfo = publicInfo != null ? publicInfo : new PublicInfo();
	this.privateInfo = privateInfo != null ? privateInfo : new PrivateInfo();
	this.accountInfo = accountInfo != null ? accountInfo : new AccountInfo();
	this.personSettings = personSettings != null ? personSettings : new PersonSettings();
	this.pictures = pictures;
	if (dogs == null) {
		dogs = new Array();
	} else if (Array.isArray(dogs)) {
		this.dogs = dogs;
	} else {
		this.dogs = new Array(dogs);
	}
}

function PublicInfo(firstName = "", lastName = "", bio = "", organization = "", profilePicture = null) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.bio = bio;
	this.organization = organization;
	this.profilePicture = profilePicture;
}

function PrivateInfo(address = null, phone = null, email = null) {
	this.address = address;
	this.phone = phone;
	this.email = email;
}

function AccountInfo(friends = null) {
	this.friends = friends != null ? friends : null;//new Friends();
}

function PersonSettings(breeder = false, visible = false) {
	this.breeder = breeder;
	this.visible = visible;
}

function Dog(publicInfo = null, healthInfo = null, breedingInfo = null, sellingInfo = null) {
	this.publicInfo = publicInfo != null ? publicInfo : new PublicInfo();
	this.healthInfo = healthInfo != null ? healthInfo : new HealthInfo();
	this.breedingInfo = breedingInfo != null ? breedingInfo : new BreedingInfo();
	this.sellingInfo = sellingInfo != null ? sellingInfo : new SellingInfo();
}

function HealthInfo() {

}

function BreedingInfo() {

}

function SellingInfo() {

}