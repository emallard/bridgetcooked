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
        this.ConfigureCamera(app);
    }


    Update(dt: number) {
        let threeRenderer = this.app.db.First(ThreeRenderer);
        let threeScene = this.app.db.First(ThreeScene);
        let threeCamera = this.app.db.First(ThreeCamera);

        threeRenderer.renderer.render(threeScene.scene, threeCamera.camera);
    }


    ConfigureCamera(app: App) {
        let viewSize = 10;
        var aspect = window.innerWidth / window.innerHeight;

        let left = -aspect * viewSize / 2;
        let right = aspect * viewSize / 2;
        let top = viewSize / 2;
        let bottom = -viewSize / 2;

        var camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000);

        //camera.position.set(0, 0, 100);
        //camera.lookAt(0, 0, 0);

        let threeCamera = new ThreeCamera();
        threeCamera.camera = camera;
        app.db.Insert(threeCamera);


        app.db.OnUpdated(Tob, toby => {
            console.log('threecamera : ', toby.x, toby.y)
            camera.position.set(toby.x, toby.y, 100);
            camera.lookAt(toby.x, toby.y, 0);
            //camera.updateMatrix();
        });

    }


    ConfigureScene(app: App) {
        let scene = new THREE.Scene;
        const light = new THREE.AmbientLight(0xffffff);
        light.position.set(0, 0, 1);
        scene.add(light);

        let threeScene = new ThreeScene();
        threeScene.scene = scene;


        let testPlane = function () {
            var texture = new THREE.TextureLoader().load("Star.png");
            var material2 = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide,
                //color: 0xffff00
            });
            var geometry2 = new THREE.PlaneGeometry(5, 4, 1);
            var plane = new THREE.Mesh(geometry2, material2);
            scene.add(plane);

        }
        //testPlane();

        function testLine() {
            var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

            var points = [];
            points.push(new THREE.Vector3(0, 0, 0));
            points.push(new THREE.Vector3(0, 1, 0));
            points.push(new THREE.Vector3(0, 0, 0));
            points.push(new THREE.Vector3(1, 0, 0));

            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var line = new THREE.Line(geometry, material);

            scene.add(line);
        }
        testLine();

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
