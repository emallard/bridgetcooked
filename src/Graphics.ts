
import * as THREE from "three";

export class Graphics {

    Create() {

        let viewSize = 10;
        //let width = 
        //width / - 2, width / 2, height / 2, height / - 2

        var aspect = window.innerWidth / window.innerHeight;
        let left = -aspect * viewSize / 2;
        let right = aspect * viewSize / 2;
        let top = viewSize / 2;
        let bottom = -viewSize / 2;


        var scene = new THREE.Scene();
        var camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000);


        //var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);



        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';

        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        var points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(0, 1, 0));
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(1, 0, 0));

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var line = new THREE.Line(geometry, material);

        scene.add(line);


        var texture = new THREE.TextureLoader().load("Star.png");
        var material2 = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            //color: 0xffff00
        });
        var geometry2 = new THREE.PlaneGeometry(5, 4, 1);
        var plane = new THREE.Mesh(geometry2, material2);
        scene.add(plane);


        const light = new THREE.AmbientLight(0xffffff);

        // move the light back and up a bit
        light.position.set(0, 0, 1);
        //light.target.position.set(0, 0, 0)
        scene.add(light);

        setInterval(() => renderer.render(scene, camera));

    }
}




