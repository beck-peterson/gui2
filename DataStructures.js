/* Created 3:00 PM 3/19/2020 */

/*
	Current structures:

	Person
	PublicInfo
	PrivateInfo
	AccountInfo
	Settings
*/

/*
	Note that the complete constructor and copy constructor call copy constructors
	when applicable. This is to push any type checking or error checking down the
	line to prevent duplicate checks. Additionally, this ensures a deep copy to
	prevent people from changing stale objects.
*/

////
///  Person
//

// Default constructor
function Person() {
	this.publicInfo = new PublicInfo();
	this.privateInfo = new PrivateInfo();
	this.accountInfo = new AccountInfo();
	this.settings = new Settings();
}

// Complete constructor
function Person(publicInfo, privateInfo, accountInfo, settings) {
	this.publicInfo = new PublicInfo(publicInfo);
	this.privateInfo = new PrivateInfo(privateInfo);
	this.accountInfo = new AccountInfo(accountInfo);
	this.settings = new Settings(settings);
}

// Copy constructor
function Person(person) {
	this.publicInfo = new PublicInfo(person.publicInfo);
	this.privateInfo = new PrivateInfo(person.privateInfo);
	this.accountInfo = new AccountInfo(person.accountInfo);
	this.settings = new Settings(person.settings);
}

////
///  PublicInfo **Note: this objects content is incomplete**
//

// Default constructor
function PublicInfo() {
	this.firstName = null;
	this.lastName = null;
}

// Complete constructor
function PublicInfo(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

// Copy constructor
function PublicInfo(publicInfo) {
	this.firstName = publicInfo.firstName;
	this.lastName = publicInfo.lastName;
}

////
///  PrivateInfo **Note: this objects content is incomplete**
//

// Default constructor
function PrivateInfo() {
	this.address = null;
}

// Complete constructor
function PrivateInfo(address) {
	this.address = address;
}

// Copy constructor
function PrivateInfo(privateInfo) {
	this.address = privateInfo.address;
}

////
///  AccountInfo **Note: this objects content is incomplete**
//

// Default constructor
function AccountInfo() {
	this.friends = null;
}

// Complete constructor
function AccountInfo(friends) {
	this.friends = new Friends(friends);
}

// Copy constructor
function AccountInfo(accountInfo) {
	this.friends = new Friends(accountInfo.friends);
}

////
///  Settings **Note: this objects content is incomplete**
//

// Default constructor
function Settings() {
	this.breeder = false;
}

// Complete constructor
function Settings(breeder) {
	this.breeder = breeder;
}

// Copy constructor
function Settings(settings) {
	this.breeder = settings.breeder;
}