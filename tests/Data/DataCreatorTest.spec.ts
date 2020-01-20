import {expect} from 'chai';
import 'mocha';

import {FakeDataCreator} from '../../src/Data/Factory/FakeDataCreator';
import { User } from '../../src/Models/Users/User';
import UserValues from '../../src/Models/Users/UserValues';
import UserValuesBuilder from '../../src/Data/Builders/UserValuesBuilder';
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
        
        const valuesBuilder: UserValuesBuilder = new UserValuesBuilder();
        
        let users: Array<User> = [
            new User(
                valuesBuilder
                    .setFirstName('Vova')
                    .setPhoneNumber('8544 333 21 31')
                    .build()
                ),
            new User(
                valuesBuilder
                    .setFirstName('B0riz')
                    .setPhoneNumber('8577 555 21 98')
                    .build()
                ),
            new User(
                valuesBuilder
                    .setFirstName('Michael')
                    .setPhoneNumber('8544 123 55 21')
                    .build()
                )
        ]; 
        if(provider != null) {

            for(let user of users) {
                provider.addUser(user);
            }
            const vovaUser = await provider.getUserById(0);
            const borizUser = await provider.getUserById(1);
            const michaUser = await provider.getUserById(2);

            if(vovaUser != null && borizUser != null && michaUser != null) {
                expect(vovaUser.getValues().firstName).is.equals('Vova');
                expect(borizUser.getValues().firstName).is.equals('B0riz');
                expect(michaUser.getValues().firstName).is.equals('Michael');
            } else {
                expect.fail('Some users is null');
            }
        } 
        else {
            expect.fail('Provider is null.');
        } 

    });
});