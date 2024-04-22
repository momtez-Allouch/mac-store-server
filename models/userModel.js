class User {
	constructor(name) {
		this.name = name;
	}

	greet() {
		return `Bonjour, ${this.name} !`;
	}
}

// Utilisation de la classe
const instance = new MyClass('Alice');
console.log(instance.greet());
