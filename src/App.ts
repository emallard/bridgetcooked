import { Db } from "./Db/Db";
import { Tob } from "./Blocks/Tob";
import { Table } from "./Blocks/Table";
import { Supply } from "./Blocks/Supply";
import { IUpdatable } from "./IUpdatable";

export class App {

    updatables: IUpdatable[] = [];
    db: Db;
    CreateNoDom(): App {
        this.db = new Db();
        return this;
    }

    CreateDom(): App {
        this.CreateNoDom();
        return this;
    }

    AddUpdatable(updatable: IUpdatable) {
        this.updatables.push(updatable);
    }


    Update(dt: number) {
        this.updatables.forEach(x => {
            x.Update(dt);
        });
    }

    AddFloor(x: number, y: number) {


    }

    AddToby(x: number, y: number): Tob {
        return null;
    }

    ActionOnSupply(toby: Tob, supply: Supply) {
        return null;
    }
    ActionOnTable(toby: Tob, table: Table) {
        return null;
    }

    AddMoveController() {

    }

    AddActionController() {

    }

    AddSupply(x: number, y: number): Supply {
        return null;
    }
    AddTable(x: number, y: number): Table {
        return null;
    }

    IsSupply(x: number, y: number) { }

    IsTable(x: number, y: number) { }

    CreateCharacter(x: number, y: number) { }
}


