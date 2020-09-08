import { Level } from "./Level";
import { LoadImage } from "./LoadImage";
import { Block } from "./Blocks/Block";
import { Table } from "./Blocks/Table";
import { Wall } from "./Blocks/Wall";

export class LevelBuilder {

    grass: HTMLImageElement;
    wood: HTMLImageElement;
    stone: HTMLImageElement;
    water: HTMLImageElement;
    wall: HTMLImageElement;

    blockWidth = 100;
    blockHeight = 80;

    async LoadAsync() {
        this.grass = await LoadImage('GrassBlock.png');
        this.wood = await LoadImage('WoodBlock.png');
        this.stone = await LoadImage('StoneBlock.png');
        this.water = await LoadImage('WaterBlock.png');
        this.wall = await LoadImage('WallBlock.png');

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
                if (char == 'w')
                    img = this.wall;
                if (char == '-') {
                    isSprite = true;
                    img = this.stone;
                }

                let x = (indexChar * this.blockWidth);
                let y = (indexLine * this.blockHeight);

                let imgX = x - 50;
                let imgY = y - 90;
                if (!isSprite) {
                    imgY = y - 130;
                }

                let clone: HTMLImageElement = <HTMLImageElement>img.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.left = imgX + 'px';
                clone.style.top = imgY + 'px';
                clone.style.zIndex = '' + y;
                level.container.appendChild(clone);

                /*
                if (!isSprite) {
                    if (char == 't') {
                        let table = new Table();
                        table.position[0] = x;
                        table.position[1] = y;
                        level.blocks.push(table);
                    }
                    if (char == 'w') {
                        let wall = new Wall();
                        wall.position[0] = x;
                        wall.position[1] = y;
                        level.blocks.push(wall);
                    }
                }
                */
            }
        });
    }

    lvl1 = `
0000000000000
0111111111110
01wwwwwwwww10
01w--ttt--w10
01wt-----tw10
01wt-----tw10
01wt-----tw10
01w-------w10
01w-------w10
01wwwwwwwww10
0111111111110
0000000000000
`;
}



