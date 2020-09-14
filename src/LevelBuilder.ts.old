import { Level } from "./Level";
import { LoadImage } from "./LoadImage";
import { Block } from "./Blocks/Block";
import { Table } from "./Blocks/Table";
import { Supply } from "./Blocks/Supply";
import { Wall } from "./Blocks/Wall";

export class LevelBuilder {

    grass: HTMLImageElement;
    wood: HTMLImageElement;
    wood2: HTMLImageElement;
    stone: HTMLImageElement;
    stone2: HTMLImageElement;
    water: HTMLImageElement;
    wall: HTMLImageElement;
    supply: HTMLImageElement;
    star: HTMLImageElement;

    blockWidth = 100;
    blockHeight = 80;

    async LoadAsync() {
        this.grass = await LoadImage('GrassBlock.png');
        this.wood = await LoadImage('WoodBlock.png');
        this.wood2 = await LoadImage('WoodBlock2.png');
        this.stone = await LoadImage('StoneBlock.png');
        this.stone2 = await LoadImage('StoneBlock2.png');
        this.water = await LoadImage('WaterBlock.png');
        this.wall = await LoadImage('WallBlock.png');
        this.supply = await LoadImage('SupplyBlock.png');
        this.star = await LoadImage('Star.png');

    }
    CreateLevel(): Level {

        let level = new Level();

        this.Parse(this.lvl1, level);
        return level;
    }


    Parse(str: string, level: Level) {
        let lines = str.split('\n').filter(x => x.length > 0);
        lines.forEach((line, indexLine) => {

            for (let indexChar = 0; indexChar < line.length; indexChar++) {

                let char = line[indexChar];
                let img: HTMLImageElement;
                let isSprite = false;

                if (char == '0') {
                    isSprite = true;
                    img = this.water;
                }
                if (char == '1') {
                    isSprite = true;
                    img = this.grass;
                }
                if (char == 't')
                    img = this.wood;
                if (char == 'u')
                    img = this.wood2;
                if (char == 'w')
                    img = this.wall;

                if (char == '-') {
                    isSprite = true;
                    img = this.stone;
                }
                if (char == '+') {
                    isSprite = true;
                    img = this.stone2;
                }

                if (char == 'A') {
                    img = this.supply;
                }

                let x = (indexChar * this.blockWidth);
                let y = (indexLine * this.blockHeight);

                let imgX = x - 50;
                let imgY = y - 90;
                if (!isSprite) {
                    imgY = y - 130;
                }


                if (isSprite) {
                    let clone: HTMLImageElement = <HTMLImageElement>img.cloneNode(true);
                    clone.style.position = 'absolute';
                    clone.style.left = imgX + 'px';
                    clone.style.top = imgY + 'px';
                    clone.style.zIndex = '' + y;
                    level.container.appendChild(clone);
                }


                if (!isSprite) {

                    /*
                    let clone: HTMLImageElement = <HTMLImageElement>img.cloneNode(true);

                    if (char == 't' || char == 'u') {
                        let table = new Table();
                        table.position[0] = x;
                        table.position[1] = y;
                        table.size[0] = 50;
                        table.size[1] = 40;
                        table.img = clone;
                        level.blocks.push(table);
                    }

                    if (char == 'A') {
                        let table = new Supply();
                        table.position[0] = x;
                        table.position[1] = y;
                        table.size[0] = 50;
                        table.size[1] = 40;
                        table.img = clone;
                        level.blocks.push(table);
                    }
                    */
                }

            }
        });
    }

    lvl1 = `
0000000000000
0111111111110
01wwwwwwwww10
01wA+t+t+tw10
01w+-+-+-+w10
01wu-----tw10
01wu-----+w10
01wt-----tw10
01w+-----+w10
01w-------w10
0111111111110
0000000000000
`;
}



