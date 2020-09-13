import { DbEntity } from "./DbEntity";
import { DbCollection } from "./DbCollection";
import { Select } from "./Select";
import { Join } from "./Join";
import { DbTypedGroup } from "./DbGroup";

export class Db {

    idCount: number = 1;
    doLog = false;
    logLevel = 0;
    NewId(): string {
        return (this.idCount++).toString();
    }

    collections = new Map<string, DbCollection>();
    private Collection(ctorName: string): DbCollection {
        let found = this.collections.get(ctorName)
        if (!found) {
            found = new DbCollection();
            this.collections.set(ctorName, found);
        }
        return found;
    }


    Update(t: DbEntity): void {
        this.Log(1, () => 'Db : Save in ' + t.constructor.name + ' : ' + t.id);
        this.Collection(t.constructor.name).Update(t);
    }

    Insert(t: DbEntity): void {
        if (!t.id) {
            t.id = this.NewId();
        }
        this.Log(1, () => 'Db : Insert in ' + t.constructor.name + ' : ' + t.id);
        this.Collection(t.constructor.name).Insert(t);
    }

    Delete(t: DbEntity): void {
        this.Log(1, () => 'Db : Insert in ' + t.constructor.name + ' : ' + t.id);
        this.Collection(t.constructor.name).Delete(t);
    }

    First<T extends DbEntity>(ctor: { new(): T }, predicate?: (t: T) => boolean): T {
        if (!predicate)
            return <T>this.Collection(ctor.name).array[0]
        else
            return (<Array<T>>this.Collection(ctor.name).array).find(predicate);
    }


    GetById<T extends DbEntity>(ctor: { new(): T }, id: string): T {
        let found = this.Collection(ctor.name).GetById(id);
        if (found == undefined || found == null) {
            console.log(Array.from(this.Collection(ctor.name).map.keys()));
            console.log(Array.isArray(id));
            throw Error('Id not found : ' + id + ' on collection ' + ctor.name);
        }
        return <T>found;
    }

    GetAll<T extends DbEntity>(ctor: { new(): T }): T[] {
        return <Array<T>>this.Collection(ctor.name).array;
    }

    Count<T extends DbEntity>(ctor: { new(): T }, where?: (t: T) => boolean): number {
        if (where == null)
            return this.Collection(ctor.name).array.length;
        else {
            let count = 0;
            for (let entity of this.Collection(ctor.name).array) {
                if (where(<T>entity))
                    count++;
            }
            return count;
        }
    }

    Select<T extends DbEntity>(ctorT: { new(): T }, where?: (t: T) => boolean): T[] {
        if (where == null)
            return this.GetAll(ctorT);
        return this.GetAll(ctorT).filter(where);
    }

    Select11<T extends DbEntity, U extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, where?: (t: T, u: U) => boolean): [T, U][] {
        return Select.Select11(this.GetAll(ctorT), this.GetAll(ctorU), where);
    }

    Select111<T extends DbEntity, U extends DbEntity, V extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, ctorV: { new(): V }, where?: (t: T, u: U, v: V) => boolean): [T, U, V][] {
        return Select.Select111(this.GetAll(ctorT), this.GetAll(ctorU), this.GetAll(ctorV), where);
    }

    Select1111<T extends DbEntity, U extends DbEntity, V extends DbEntity, W extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, ctorV: { new(): V }, ctorW: { new(): W }, where?: (t: T, u: U, v: V, w: W) => boolean): [T, U, V, W][] {
        return Select.Select1111(this.GetAll(ctorT), this.GetAll(ctorU), this.GetAll(ctorV), this.GetAll(ctorW), where);
    }

    GroupBy2<T extends DbEntity, U extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, where: (t: T, u: U) => boolean, includeEmptyGroups: boolean): [T, U[]][] {
        return Select.GroupBy2(this.GetAll(ctorT), this.GetAll(ctorU), where, includeEmptyGroups);
    }

    GroupBy1<T extends DbEntity>(ctorT: { new(): T }, propertyFunc: (t: T) => string): T[][] {
        return Select.GroupBy1(this.GetAll(ctorT), propertyFunc);
    }

    GroupBy<T extends DbEntity>(ctorT: { new(): T }, propertyFunc: (t: T) => string): DbTypedGroup<T>[] {
        let allT = this.GetAll(ctorT);
        let groups: DbTypedGroup<T>[] = [];
        let keys = new Set<string>();
        for (let t of allT) {
            keys.add(propertyFunc(t));
        }

        for (let key of keys) {
            let elementsInGroup: T[] = allT.filter(t => propertyFunc(t) == key);
            let g = new DbTypedGroup<T>();
            g.key = key;
            g.elements = elementsInGroup;
            groups.push(g);
        }

        return groups;
    }

    Join2<T extends DbEntity, U extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, tFunc: (t: T) => string, uFunc: (u: U) => string): [T, U][] {
        return Join.Join2(this.GetAll(ctorT), this.GetAll(ctorU), tFunc, uFunc);
    }

    Join3<T extends DbEntity, U extends DbEntity, V extends DbEntity>(ctorT: { new(): T }, ctorU: { new(): U }, ctorV: { new(): V }, tFunc: (t: T) => string, uFunc: (u: U) => string, vFunc: (v: V) => string): [T, U, V][] {
        return Join.Join3(this.GetAll(ctorT), this.GetAll(ctorU), this.GetAll(ctorV), tFunc, uFunc, vFunc);
    }

    Log(level: number, message: () => any) {
        if (level <= this.logLevel)
            console.log(message());
    }




    OnInserted<T extends DbEntity>(ctorT: { new(): T }, tFunc: (t: T) => void) {
        this.Collection(ctorT.name).OnInserted(tFunc);
    }

    OnUpdated<T extends DbEntity>(ctorT: { new(): T }, tFunc: (t: T) => void) {
        this.Collection(ctorT.name).OnUpdated(tFunc);
    }
}

