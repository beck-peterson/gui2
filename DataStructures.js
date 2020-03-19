/* Created 3:00 PM 3/19/2020 */

function Person(publicInfo = null, privateInfo = null, accountInfo = null, personSettings = null, bio = "", pictures = null) {
	this.publicInfo = publicInfo != null ? publicInfo : new PublicInfo();
	this.privateInfo = privateInfo != null ? privateInfo : new PrivateInfo();
	this.accountInfo = accountInfo != null ? accountInfo : new AccountInfo();
	this.personSettings = personSettings != null ? personSettings : new PersonSettings();
	this.bio = bio;
	this.pictures = pictures;
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
	this.friends = friends != null ? friends : new Friends();
}

function PersonSettings(breeder = false, visible = false) {
	this.breeder = breeder;
	this.visible = visible;
}