/* Created 3:00 PM 3/19/2020 */

lola = new Dog(new GeneralInfo("Lola"));
window.testPerson = new Person(new PublicInfo("Cesar", "Milan", "Dog Whisperer", "https://www.gstatic.com/tv/thumb/persons/503118/503118_v9_ba.jpg"), null, null, new PersonSettings(true, true), "", "", lola);

function Person(publicInfo = null, privateInfo = null, accountInfo = null, personSettings = null, bio = "", pictures = null, dogs = null) {
	this.publicInfo = publicInfo != null ? publicInfo : new PublicInfo();
	this.privateInfo = privateInfo != null ? privateInfo : new PrivateInfo();
	this.accountInfo = accountInfo != null ? accountInfo : new AccountInfo();
	this.personSettings = personSettings != null ? personSettings : new PersonSettings();
	this.bio = bio;
	this.pictures = pictures;
	if (dogs == null) {
		dogs = new Array();
	} else if (Array.isArray(dogs)) {
		this.dogs = dogs;
	} else {
		this.dogs = new Array(dogs);
	}
}

function PublicInfo(firstName = "", lastName = "", organisation = "", profilePicture = null) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.organisation = organisation;
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

function Dog(generalInfo = null, healthInfo = null, breedingInfo = null, sellingInfo = null) {
	this.generalInfo = generalInfo != null ? generalInfo : new GeneralInfo();
	this.healthInfo = healthInfo != null ? healthInfo : new HealthInfo();
	this.breedingInfo = breedingInfo != null ? breedingInfo : new BreedingInfo();
	this.sellingInfo = sellingInfo != null ? sellingInfo : new SellingInfo();
}

function GeneralInfo(firstName = "", lastName = "") {
	this.firstName = firstName;
	this.lastName = lastName;
}

function HealthInfo() {

}

function BreedingInfo() {

}

function SellingInfo() {

}