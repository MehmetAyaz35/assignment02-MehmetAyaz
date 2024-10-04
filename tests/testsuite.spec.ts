import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { FakeDataGenerator } from './testData';


const baseUrl = `${process.env.BASE_URL}`;
// console.log("Base URL:", baseUrl); 

test.describe('Tester Hotel application - api tests', () => {
    let apiHelper: APIHelper;
    let fakeDataGenerator: FakeDataGenerator;


    test.beforeAll('login, get access token', async ({ request }) => {
        apiHelper = new APIHelper(baseUrl);
        fakeDataGenerator = new FakeDataGenerator();
        const login = await apiHelper.login(request);
        expect(login.status()).toBe(200);
    });


    test('Test Case 01 - get all clients', async ({ request }) => {
        const getAllClients = await apiHelper.getAllClients(request);
        expect(getAllClients.status()).toBe(200);

        
    });

});