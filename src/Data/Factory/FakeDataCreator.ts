import { IDataProviderCreator } from "../IDataProviderCreator";
import {IDataProvider} from "../IDataProvider";
import { FakeDataProvider } from "../Providers/FakeDataProvider";

export class FakeDataCreator implements IDataProviderCreator {
    create(): IDataProvider | null {
        return new FakeDataProvider();
    }
}