import { App } from "../App";
import { IUpdatable } from "../IUpdatable";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { ThreeScene } from "./ThreeSystem";
import * as THREE from "three";
import { DbEntity } from "../Db/DbEntity";
import { GraphicsSpriteUrl } from "../Blocks/GraphicsSpriteUrl";

export class ThreeGraphicsSprite extends DbEntity {
    graphicsSpriteId: string;
    material: THREE.MeshStandardMaterial;
    geometry: THREE.PlaneGeometry;
    mesh: THREE.Mesh;
}

export class ThreeGraphicsSpriteSystem implements IUpdatable {
    app: App;
    loader = new THREE.TextureLoader();

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        app.db.OnInserted(GraphicsSprite, sprite => {

            //var texture = undefined;//this.loader.load('256.jpg');
            var material2 = new THREE.MeshStandardMaterial({
                //map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                //opacity: 0.5
                //color: 0xffff00
            });

            //let material2 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
            var geometry2 = new THREE.PlaneGeometry(1, 1, 1);
            var mesh = new THREE.Mesh(geometry2, material2);
            let threeGraphicsSprite = new ThreeGraphicsSprite();
            threeGraphicsSprite.material = material2;
            threeGraphicsSprite.geometry = geometry2;
            threeGraphicsSprite.mesh = mesh;
            threeGraphicsSprite.graphicsSpriteId = sprite.id;

            app.db.Insert(threeGraphicsSprite);

            let scene = app.db.First(ThreeScene);

            if (sprite.isForeground) {
                scene.foregroundScene.add(mesh);
            }

            else
                scene.backgroundScene.add(mesh);
        })

        app.db.OnUpdated(GraphicsSprite, sprite => {
            let threeGraphicsSprite = app.db.First(ThreeGraphicsSprite, x => x.graphicsSpriteId == sprite.id);
            threeGraphicsSprite.mesh.position.set(sprite.x, sprite.y, sprite.z);
            threeGraphicsSprite.mesh.scale.set(sprite.width, sprite.height, 1);
        });

        app.db.OnUpdated(GraphicsSpriteUrl, spriteUrl => {
            let threeGraphicsSprite = app.db.First(ThreeGraphicsSprite, x => x.graphicsSpriteId == spriteUrl.idGraphicsSprite);
            if (spriteUrl.url != undefined) {
                threeGraphicsSprite.material.map = this.loader.load(spriteUrl.url);
                threeGraphicsSprite.material.needsUpdate = true;
            }

        });
    }

    Update(dt: number) {

    }

}
