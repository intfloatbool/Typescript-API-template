import ValuesBase from "../Models/ValuesBase";

/**
 * IDataProvider<T, V> where T - is type of provided data, V - is type of data values
 */
export interface IDataProvider<T, V extends ValuesBase> {
    create(item: T): Promise<T>;
    update(itemId: Number, values: V): Promise<T>; 
    read(id: Number): Promise<T> | Promise<null>;
    delete(id: Number): Promise<boolean>;
    list(): Promise<Array<T>>;
}