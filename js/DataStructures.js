/* Created 3:00 PM 3/19/2020 */

window.testPerson = new Person(new PublicInfo("Cesar", "Milan", "Dog Whisperer", "https://www.gstatic.com/tv/thumb/persons/503118/503118_v9_ba.jpg"), null, null, new PersonSettings(true, true), "", "");

function Person(publicInfo = null, privateInfo = null, accountInfo = null, personSettings = null, bio = "", pictures = null) {
	this.publicInfo = publicInfo != null ? publicInfo : new PublicInfo();
	this.privateInfo = privateInfo != null ? privateInfo : new PrivateInfo();
	this.accountInfo = accountInfo != null ? accountInfo : new AccountInfo();
	this.personSettings = personSettings != null ? personSettings : new PersonSettings();
	this.bio = bio;
	this.pictures = pictures;
}

function PublicInfo(firstName = "", lastName = "", organization = "", profilePicture = null) {
	this.firstName = firstName;
	this.lastName = lastName;
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

function Dog(age = null, breed = "", city = "", dogPurpose = "", name = "", sex = "", state = "", zip = null) {
	this.age = age;
	this.breed = breed;
	this.city = city;
	this.dogPurpose = dogPurpose;
	this.name = name;
	this.sex = sex;
	this.state = state;
	this.zip = zip;
}
