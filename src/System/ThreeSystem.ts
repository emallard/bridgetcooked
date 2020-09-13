import { App } from "../App";
import { IUpdatable } from "../IUpdatable";
import { Tob } from "../Blocks/Tob";
import * as THREE from "three";
import { DbEntity } from "../Db/DbEntity";


export class ThreeRenderer extends DbEntity {
    renderer: THREE.WebGLRenderer;
}

export class ThreeScene extends DbEntity {
    scene: THREE.Scene;
}

export class ThreeCamera extends DbEntity {
    camera: THREE.Camera;
}

export class ThreeSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        this.ConfigureRenderer(app);
        this.ConfigureScene(app);
    }


    Update(dt: number) {
        let threeRenderer = this.app.db.First(ThreeRenderer);
        let threeScene = this.app.db.First(ThreeScene);
        let threeCamera = this.app.db.First(ThreeCamera);

        threeRenderer.renderer.render(threeScene.scene, threeCamera.camera);
    }


    ConfigureCamera(app: App) {
        let viewSize = 1000;
        var aspect = window.innerWidth / window.innerHeight;

        let left = -aspect * viewSize / 2;
        let right = aspect * viewSize / 2;
        let top = viewSize / 2;
        let bottom = -viewSize / 2;

        var camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000);

        let threeCamera = new ThreeCamera();
        threeCamera.camera = camera;
        app.db.Insert(threeCamera);

        app.db.OnUpdated(Tob, toby => {
            camera.position.set(toby.x, toby.y, 100);
            camera.lookAt(toby.x, toby.y, 0);
            //camera.updateMatrix();
        })
    }


    ConfigureScene(app: App) {
        let scene = new THREE.Scene;
        const light = new THREE.AmbientLight(0xffffff);
        light.position.set(0, 0, 1);
        scene.add(light);

        let threeScene = new ThreeScene();
        threeScene.scene = scene;
        app.db.Insert(threeScene);
    }

    ConfigureRenderer(app: App) {

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';

        let threeRenderer = new ThreeRenderer();
        threeRenderer.renderer = renderer;

        app.db.Insert(threeRenderer);
    }

}
