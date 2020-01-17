import {expect} from 'chai';
import 'mocha';

import {FakeDataCreator} from '../../src/Data/Factory/FakeDataCreator';
import { User } from '../../src/Models/Users/User';
import UserValues from '../../src/Models/Users/UserValues';

describe('DataCreators functional', () => {
    it('Should return data provider', () => {
        const dataCreator = new FakeDataCreator();
        const provider = dataCreator.create();
        expect(provider).is.not.null;
    });

    it('Data provider should return any data', async () => {
        const dataCreator = new FakeDataCreator();
        const provider = dataCreator.create();
        if(provider != null) {
            const users = await provider.getUsers();
            expect(users).is.not.null;
        }   
    });

    it('Provider should fully funcionallyty', async () => {
        const dataCreator = new FakeDataCreator();
        const provider = dataCreator.create();
        
        let users: Array<User> = [
            new User(new UserValues('Vova', '8544 333 21 31')),
            new User(new UserValues('B0riz', '8577 555 21 98')),
            new User(new UserValues('Michael', '8544 123 55 21'))
        ]; 
        if(provider != null) {

            for(let user of users) {
                provider.addUser(user);
            }
            const vovaUser = await provider.getUserById(0);
            const borizUser = await provider.getUserById(1);
            const michaUser = await provider.getUserById(2);

            if(vovaUser != null && borizUser != null && michaUser != null) {
                expect(vovaUser.getValues().getFirstName()).is.equals('Vova');
                expect(borizUser.getValues().getFirstName()).is.equals('B0riz');
                expect(michaUser.getValues().getFirstName()).is.equals('Michael');
            } else {
                expect.fail('Some users is null');
            }
        } 
        else {
            expect.fail('Provider is null.');
        } 

    });
});