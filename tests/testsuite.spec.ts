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

        const responseBody = await getAllClients.json();
        expect(responseBody).toBeTruthy(); 
        expect(Array.isArray(responseBody)).toBeTruthy();
        
        responseBody.forEach(client => {
            expect(client).toHaveProperty('id');
            expect(client).toHaveProperty('name');
        });
    
        expect(responseBody.length).toBeGreaterThan(0); 
     
    });

    test('Test Case 02 - create new client', async ({ request }) => {
        const payload = fakeDataGenerator.generateClientData();
        const createClient = await apiHelper.createClient(request, payload);
        expect(createClient.ok()).toBeTruthy();
        expect(await createClient.json()).toMatchObject(payload);

        const getClients = await apiHelper.getAllClients(request);
        expect(await getClients.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(payload),
            ])
        );
    });

    test('Test Case 03 - Verify all client IDs exist', async ({ request }) => {

        const clientIds = await apiHelper.getClientIds(request);
        // console.log("Client IDs:", clientIds);
    
        // Verification test for each client ID
        for (const clientId of clientIds) {
            const clientResponse = await apiHelper.getClientById(request, clientId);
            expect(clientResponse.status()).toBe(200);
    
            const clientData = await clientResponse.json();
            expect(clientData.id).toBe(clientId); // Client ID verification
        }
    });

    test('Test Case 04 - delete specific client by id', async ({ request }) => {
        const getClients = await apiHelper.getAllClients(request);
        const allClients = await getClients.json();
        const lastButOneID = allClients[allClients.length - 2].id;

        const deleteClient = await apiHelper.deleteClientById(request, lastButOneID);
        expect(deleteClient.ok()).toBeTruthy();

        const getClientById = await apiHelper.getClientById(request, lastButOneID);
        expect(getClientById.status()).toBe(401);
    });

});