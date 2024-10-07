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

    generateRoomData = () => {
        const floor = faker.number.int({ min: 1, max: 10 }).toString();
        const number = faker.number.int({ min: 1, max: 20 }).toString();
        const price = faker.number.int({ min: 300, max: 10000 });
        const available = faker.datatype.boolean();
    
        const categoryOptions = ['double', 'single', 'twin'];
        const category = faker.number.int({ min: 0, max: categoryOptions.length - 1 }); 
    
        const featureOptions = ['balcony', 'ensuite', 'sea view', 'penthouse'];
        const numberOfFeatures = faker.number.int({ min: 1, max: featureOptions.length });
    
        // Randomly shuffle the featureOptions array and take the first 'numberOfFeatures' features
        const features = featureOptions
            .sort(() => 0.5 - Math.random())
            .slice(0, numberOfFeatures);     
    
        return {
            category: categoryOptions[category],   
            number: Number(floor + number),
            floor: Number(floor),    
            available: available,       
            price: price,    
            features: features                   
        };
    };

    editRoomData = (id: string) => {
        let payload = this.generateRoomData();
        payload['id'] = id;

        return payload;
    };

    generateBillData = () => {
        const value = faker.number.int({ min: 1, max: 50 });
        const paid = faker.datatype.boolean();

        return {
            value: value,
            paid: paid
        };
    };

    
};