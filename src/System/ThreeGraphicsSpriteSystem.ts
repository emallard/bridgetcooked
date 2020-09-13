import { App } from "../App";
import { IUpdatable } from "../IUpdatable";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { ThreeScene } from "./ThreeSystem";
import * as THREE from "three";
import { DbEntity } from "../Db/DbEntity";

export class ThreeGraphicsSprite extends DbEntity {
    material: THREE.MeshStandardMaterial;
    geometry: THREE.PlaneGeometry;
    mesh: THREE.Mesh;
}

export class ThreeGraphicsSpriteSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        app.db.OnInserted(GraphicsSprite, sprite => {

            var texture = new THREE.TextureLoader().load(sprite.url);
            var material2 = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide,
                //color: 0xffff00
            });

            //let material2 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
            var geometry2 = new THREE.PlaneGeometry(5, 4, 1);
            var mesh = new THREE.Mesh(geometry2, material2);
            let threeGraphicsSprite = new ThreeGraphicsSprite();
            threeGraphicsSprite.material = material2;
            threeGraphicsSprite.geometry = geometry2;
            threeGraphicsSprite.mesh = mesh;

            app.db.Insert(threeGraphicsSprite);

            let scene = app.db.First(ThreeScene);
            scene.scene.add(mesh);
        })
    }

    Update(dt: number) {
    }

}
