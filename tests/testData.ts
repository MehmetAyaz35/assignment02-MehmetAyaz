import { faker } from "@faker-js/faker";

export class FakeDataGenerator {

    generateClientData = () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const telephone = faker.phone.number();

        return {
            name: name,
            email: email,  
            telephone: telephone
        };
    };

    
};