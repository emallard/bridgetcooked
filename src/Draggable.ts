

export enum DraggableType {

    None,
    Star,
    Onion,
    OnionCut,
    Kiwi,
    KiwiCut,
    Plate,
}



export class Draggable {

    type: DraggableType;
    img: HTMLImageElement;
}
