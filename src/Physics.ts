

export class PhysicsRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class CollisionRectResult {
    collideLeft: boolean;
    depthLeft: number;
    collisionTimeLeft: number;


    collideRight: boolean;
    depthRight: number;
    collisionTimeRight: number;

    collideBottom: boolean;
    depthBottom: number;
    collisionTimeBottom: number;

    collideTop: boolean;
    depthTop: number;
    collisionTimeTop: number;
}


export class Physics {



    static IsPointInRect(pt: Float32Array, rectCenter: Float32Array, rectSize: Float32Array): boolean {
        //console.log(pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]);
        return (pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]
            && pt[1] > rectCenter[1] - rectSize[1] && pt[1] < rectCenter[1] + rectSize[1]);
    }

    static CollideAll(rect1: PhysicsRect, allRects: PhysicsRect[], speedX: number, speedY: number, dt: number): void {


        let fstep = (simStep: number) => {
            //console.log('accumDt : ', accumDt);
            //console.log('prev : ', rect1.x, rect1.y);
            //console.log('move : ', speedX * simStep, speedY * simStep);

            rect1.x += speedX * simStep;
            rect1.y += speedY * simStep;

            //console.log('test : ', rect1.x, rect1.y);

            let collideLeft = false;
            let collideRight = false;
            let collideTop = false;
            let collideBottom = false;

            for (let i = 0; i < allRects.length; ++i) {
                let rect2 = allRects[i];
                let result = Physics.Collide(rect1, rect2, speedX, speedY);
                //console.log(result);
                if (result != null) {
                    collideLeft = collideLeft || (result == 'left');
                    collideRight = collideRight || (result == 'right');
                    collideTop = collideTop || (result == 'top');
                    collideBottom = collideBottom || (result == 'bottom');
                }

            }


            if (collideRight || collideLeft) {
                rect1.x -= speedX * simStep;
                speedX = 0;
            }

            if (collideTop || collideBottom) {
                rect1.y -= speedY * simStep;
                speedY = 0;
            }


            //console.log('result : ', rect1.x, rect1.y);
        }

        let accumDt = 0;
        while (accumDt < dt) {
            let realSimStep = 0.005;
            if (accumDt + realSimStep > dt)
                realSimStep = dt - accumDt;
            fstep(realSimStep);
            accumDt += realSimStep;
        }


    }

    // https://stackoverflow.com/questions/29861096/detect-which-side-of-a-rectangle-is-colliding-with-another-rectangle
    static Collide(r1: PhysicsRect, r2: PhysicsRect, speedX: number, speedY: number): string {
        var dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
        var dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
        var width = (r1.width + r2.width) / 2;
        var height = (r1.height + r2.height) / 2;
        var crossWidth = width * dy;
        var crossHeight = height * dx;
        var collision: string = null;;
        //
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
                /*
                if (speedY > 0) {
                    collision = 'left';
                }
                if (speedX > 0) {
                    collision = 'bottom';
                }
                */
            } else {
                collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';

                /*
                if (speedY < 0) {
                    collision = 'right';
                }
                if (speedX < 0) {
                    collision = 'top';
                }
                */
            }
        }
        return (collision);
    }

    static CollideRectangle(rect1: PhysicsRect, rect2: PhysicsRect, speedX: number, speedY: number, dt: number): CollisionRectResult {


        let left1 = rect1.x + speedX * dt - rect1.width / 2;
        let right1 = rect1.x + speedX * dt + rect1.width / 2;
        let top1 = rect1.y + speedY * dt + rect1.height / 2;
        let bottom1 = rect1.y + speedY * dt - rect1.height / 2;


        let left2 = rect2.x - rect2.width / 2;
        let right2 = rect2.x + rect2.width / 2;
        let top2 = rect2.y + rect2.height / 2;
        let bottom2 = rect2.y - rect2.height / 2;

        if (right1 <= left2 || left1 >= right2 || bottom1 >= top2 || top1 <= bottom2)
            return null;

        let result = new CollisionRectResult();
        let inside = (x: number, min: number, max: number) => x > min && x < max;


        result.depthRight = 0;
        result.depthLeft = 0;
        result.depthTop = 0;
        result.depthBottom = 0;

        result.collideRight = inside(right1, left2, right2);
        result.collideLeft = inside(left1, left2, right2);

        if (result.collideLeft)
            result.depthRight = right1 - left2;
        if (result.collideLeft)
            result.depthLeft = right2 - left1;


        result.collideTop = inside(top1, bottom2, top2);
        result.collideBottom = inside(bottom1, bottom2, top2);

        if (result.collideTop)
            result.depthTop = top1 - bottom2;
        if (result.collideBottom)
            result.depthBottom = top2 - bottom1;


        //console.log('result.collideRight', result.collideRight)
        //console.log('result.collideTop', result.collideTop, top1, bottom2, top2)

        /*
        if (speedX <= 0)
            result.collideRight = false;
        if (speedX >= 0)
            result.collideLeft = false;
        if (speedY <= 0)
            result.collideTop = false;
        if (speedY >= 0)
            result.collideBottom = false;
        */

        result.collisionTimeLeft = result.depthLeft / Math.abs(speedX);
        result.collisionTimeRight = result.depthRight / Math.abs(speedX);
        result.collisionTimeTop = result.depthTop / Math.abs(speedY);
        result.collisionTimeBottom = result.depthBottom / Math.abs(speedY);


        // choose between left/right and bottom/top if both collides
        if (result.collideRight && result.collideTop) {
            let timeRight = result.depthRight / Math.abs(speedX);
            let timeTop = result.depthTop / Math.abs(speedY);
            result.collideRight = timeRight > timeTop;
            result.collideTop = !result.collideRight;
        }
        if (result.collideRight && result.collideBottom) {
            let timeRight = result.depthRight / Math.abs(speedX);
            let timeBottom = result.depthTop / Math.abs(speedY);
            result.collideRight = timeRight > timeBottom;
            result.collideBottom = !result.collideRight;
        }
        if (result.collideLeft && result.collideTop) {
            let timeLeft = result.depthLeft / Math.abs(speedX);
            let timeTop = result.depthTop / Math.abs(speedY);
            result.collideLeft = timeLeft > timeTop;
            result.collideTop = !result.collideLeft;
        }
        if (result.collideLeft && result.collideBottom) {
            let timeLeft = result.depthLeft / Math.abs(speedX);
            let timeBottom = result.depthTop / Math.abs(speedY);
            result.collideLeft = timeLeft > timeBottom;
            result.collideBottom = !result.collideLeft;
        }

        /*
        console.log('top1 ', top1);
        console.log('bottom2 ', bottom2);
        console.log('top2 ', top2);
 
        console.log('result.depthTop ', result.depthTop);
        console.log('result.collideTop = ', result.collideTop);
        */
        return result;
    }



    /*
    static CollideRectangle2(rect1: PhysicsRect, rect2: PhysicsRect, speedX: number, speedY: number, dt: number): CollisionRectResult {
 
 
 
        let left1_a = rect1.x - rect1.width / 2;
        let right1_a = rect1.x + rect1.width / 2;
        let top1_a = rect1.y + rect1.height / 2;
        let bottom1_a = rect1.y - rect1.height / 2;
 
 
        let left1_b = left1_a + speedX * dt;
        let right1_b = right1_a + speedX * dt;
        let top1_b = top1_a + speedY * dt;
        let bottom1_b = bottom1_a + speedY * dt;
 
        // cross right plane
        // cross left plane
 
        let left2 = rect2.x - rect2.width / 2;
        let right2 = rect2.x + rect2.width / 2;
        let top2 = rect2.y + rect2.height / 2;
        let bottom2 = rect2.y - rect2.height / 2;
 
        if (right1 <= left2 || left1 >= right2 || bottom1 >= top2 || top1 <= bottom2)
            return null;
        if (right1 <= left2 || left1 >= right2 || bottom1 >= top2 || top1 <= bottom2)
            return null;
 
        let result = new CollisionRectResult();
    }
    */

}
