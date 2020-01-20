import ValuesBase from "../Models/ValuesBase";

/**
 * IDataProvider<T, V> where T - is type of provided data, V - is type of data values
 */
export interface IDataProvider<T, V extends ValuesBase> {
    addItem(item: T): Promise<T>;
    updateItem(itemId: Number, values: V): Promise<T>; 
    getItems(): Promise<Array<T>>;
    getItemById(id: Number): Promise<T> | Promise<null>;
}