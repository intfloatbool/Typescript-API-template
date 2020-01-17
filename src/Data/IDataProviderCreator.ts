import { IDataProvider } from "./IDataProvider";

export interface IDataProviderCreator {
    create(): IDataProvider | null;
}