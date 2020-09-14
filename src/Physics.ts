import { CollisionRect } from "./Blocks/CollisionRect";


export class Physics {
    static IsPointInRect(pt: Float32Array, rectCenter: Float32Array, rectSize: Float32Array): boolean {
        //console.log(pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]);
        return (pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]
            && pt[1] > rectCenter[1] - rectSize[1] && pt[1] < rectCenter[1] + rectSize[1]);
    }


    /*
    CollideRectangle(rect: CollisionRect, rect2: CollisionRect) {

        var dx = rect.cx - rect2.cx;// x difference between centers
        var dy = rect.cy - rect2.cy;// y difference between centers
        var aw = (rect.w + rect2.w) * 0.5;// average width
        var ah = (rect.h + rect2.h) * 0.5;// average height

        // If either distance is greater than the average dimension there is no collision.
        if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

        // To determine which region of this rectangle the rect's center
        // point is in, we have to account for the scale of the this rectangle.
        // To do that, we divide dx and dy by it's width and height respectively.
        if (Math.abs(dx / this.w) > Math.abs(dy / this.h)) {

            if (dx < 0) rect.x = this.x - rect.w;// left
            else rect.x = this.x + this.w; // right

        } else {

            if (dy < 0) rect.y = this.y - rect.h; // top
            else rect.y = this.y + this.h; // bottom

        }

        return true;

    }
    */
}