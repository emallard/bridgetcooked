

export class Physics {
    static IsPointInRect(pt: Float32Array, rectCenter: Float32Array, rectSize: Float32Array): boolean {
        //console.log(pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]);
        return (pt[0] > rectCenter[0] - rectSize[0] && pt[0] < rectCenter[0] + rectSize[0]
            && pt[1] > rectCenter[1] - rectSize[1] && pt[1] < rectCenter[1] + rectSize[1]);
    }
}