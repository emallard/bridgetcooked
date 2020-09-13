import { DbEntity } from "./DbEntity";
export class DbCollection {
    map: Map<string, DbEntity> = new Map<string, DbEntity>();
    array: Array<DbEntity> = [];
    inserted: Array<(o: DbEntity) => void> = [];
    updated: Array<(o: DbEntity) => void> = [];

    GetById(id: string): DbEntity {
        return this.map.get(id);
    }

    Insert(o: DbEntity) {

        if (o == undefined || o == null)
            throw Error("DbCollection: Trying to save null");
        if (o.id == undefined || o.id == null)
            throw Error("DbCollection: Trying to save an object without an id");
        if (this.map.has(o.id))
            throw Error("DbCollection: Trying to insert an object with an existing id");

        this.map.set(o.id, o);
        this.array.push(o);

        this.TriggetInserted(o);
        this.TriggetUpdated(o);
        //console.log(new Array(...this.map));
    }
    Update(o: DbEntity) {
        if (!o.id)
            throw Error("DbCollection: Trying to save an object without an id");

        this.TriggetUpdated(o);
    }

    Delete(o: DbEntity) {
        if (!o.id)
            throw Error("DbCollection: Trying to delete an object without an id");

        if (!this.map.has(o.id))
            throw Error("DbCollection: Trying to delete an object with an unknown id");

        this.map.delete(o.id);

        let index = this.array.indexOf(o);
        this.array.splice(index, 1);
    }


    OnInserted(f: (o: DbEntity) => void) {
        this.inserted.push(f);
    }

    OnUpdated(f: (o: DbEntity) => void) {
        this.updated.push(f);
    }

    TriggetInserted(o: DbEntity) {
        this.inserted.forEach(x => x(o));
    }

    TriggetUpdated(o: DbEntity) {
        this.updated.forEach(x => x(o));
    }
}
