import { DbEntity } from "./DbEntity";


export interface DbGroup {
    key: string;
    getElements(): DbEntity[];
}

export class DbTypedGroup<T extends DbEntity> implements DbGroup {
    key: string;
    elements: T[];
    getElements() { return this.elements; }
}
