


export class ImageLoader {
    map = new Map<string, HTMLImageElement>();
    static instance: ImageLoader = new ImageLoader();


    async LoadAsync() {
        await this.AddAsync('Star.png');

    }

    async AddAsync(url: string) {
        let img = await LoadImage(url);
        this.map.set(url, img);
    }

    Clone(url: string): HTMLImageElement {
        return <HTMLImageElement>this.map.get(url).cloneNode(true);
    }


}

export function LoadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.addEventListener('load', e => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error(`Failed to load image's URL: ${url}`));
        });
        img.src = url;
    });
}