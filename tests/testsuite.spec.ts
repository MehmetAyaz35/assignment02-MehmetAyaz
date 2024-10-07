import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { FakeDataGenerator } from './testData';



const baseUrl = `${process.env.BASE_URL}`;
// console.log("Base URL:", baseUrl); 

test.describe.serial('Tester Hotel application - api tests', () => {
    let apiHelper: APIHelper;
    let fakeDataGenerator: FakeDataGenerator;


    test.beforeAll('login, get access token', async ({ request }) => {
        apiHelper = new APIHelper(baseUrl);
        fakeDataGenerator = new FakeDataGenerator();
        const login = await apiHelper.login(request);
        expect(login.status()).toBe(200);
    });


    test('Test Case 01 - Get all clients', async ({ request }) => {
        const getAllClients = await apiHelper.getAllClients(request);
        expect(getAllClients.status()).toBe(200);

        const responseBody = await getAllClients.json();
        expect(responseBody).toBeTruthy(); 
        expect(Array.isArray(responseBody)).toBeTruthy();
        
        responseBody.forEach(client => {
            expect(client).toHaveProperty('id');
            expect(client).toHaveProperty('name');
        });
    
        // expect(responseBody.length).toBeGreaterThan(0); 
     
    });

    test('Test Case 02 - Create new client', async ({ request }) => {
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

    test('Test Case 04 - Delete specific client by id', async ({ request }) => {
        const getClients = await apiHelper.getAllClients(request);
        const allClients = await getClients.json();
        const lastButOneID = allClients[allClients.length - 2].id;

        const deleteClient = await apiHelper.deleteClientById(request, lastButOneID);
        expect(deleteClient.ok()).toBeTruthy();

        const getClientById = await apiHelper.getClientById(request, lastButOneID);
        expect(getClientById.status()).toBe(401);
    });

    test('Test Case 05 - Get all rooms', async ({ request }) => {
        const getRooms = await apiHelper.getAllRooms(request);
        expect(getRooms.status()).toBe(200);
    });

    test('Test Case 06 - Create new room', async ({ request }) => {
        const payload = fakeDataGenerator.generateRoomData();
        const createRoom = await apiHelper.createRoom(request, payload);
        expect(createRoom.ok()).toBeTruthy();
        expect(await createRoom.json()).toMatchObject(
            expect.objectContaining(payload)
        );

        const getRooms = await apiHelper.getAllRooms(request);
        expect(await getRooms.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(payload)
            ])
        );
    });

    test('Test Case 07 - Edit room', async ({ request }) => {
        const getRooms = await apiHelper.getAllRooms(request);
        const allRooms = await getRooms.json();
        const lastButOneID = allRooms[allRooms.length - 2];
        // console.log("lastButOneID:", lastButOneID)

        const payload = fakeDataGenerator.editRoomData(lastButOneID.id);
        // console.log("payload:", payload)

        const editRoom = await apiHelper.editRoom(request, lastButOneID.id, payload);
        // const editedRoom = await editRoom.json();
        // console.log("editedRoom:", editedRoom)
        expect(editRoom.ok()).toBeTruthy();
        expect(await editRoom.json()).not.toEqual(lastButOneID);

        const getRoomById = await apiHelper.getRoomById(request, lastButOneID.id);
        expect(await getRoomById.json()).toEqual(payload);
    });


});