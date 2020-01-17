import {expect} from 'chai';
import 'mocha';

import {FakeDataCreator} from '../../src/Data/Factory/FakeDataCreator';

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
});