
export class Select {

    static Select11<T, U>(allT: T[], allU: U[], where?: (t: T, u: U) => boolean): [T, U][] {
        let jointure: [T, U][] = [];
        for (let t of allT) {
            for (let u of allU) {
                if (where == null || where(t, u))
                    jointure.push([t, u]);
            }
        }
        return jointure;
    }

    static Select111<T, U, V>(allT: T[], allU: U[], allV: V[], where?: (t: T, u: U, v: V) => boolean): [T, U, V][] {
        let jointure: [T, U, V][] = [];
        for (let t of allT) {
            for (let u of allU) {
                for (let v of allV) {
                    if (where == null || where(t, u, v))
                        jointure.push([t, u, v]);
                }
            }
        }
        return jointure;
    }

    static Select1111<T, U, V, W>(allT: T[], allU: U[], allV: V[], allW: W[], where?: (t: T, u: U, v: V, w: W) => boolean): [T, U, V, W][] {
        let jointure: [T, U, V, W][] = [];
        for (let t of allT) {
            for (let u of allU) {
                for (let v of allV) {
                    for (let w of allW) {
                        if (where == null || where(t, u, v, w))
                            jointure.push([t, u, v, w]);
                    }
                }
            }
        }
        return jointure;
    }

    static Select112<T, U, V, W>(allT: T[], allU: U[], allVW: [V, W][], where?: (t: T, u: U, v: V, w: W) => boolean): [T, U, V, W][] {
        let jointure: [T, U, V, W][] = [];
        for (let t of allT) {
            for (let u of allU) {
                for (let vw of allVW) {
                    if (where == null || where(t, u, vw[0], vw[1]))
                        jointure.push([t, u, vw[0], vw[1]]);
                }
            }
        }
        return jointure;
    }

    static Select22<A, B, C, D>(allAb: [A, B][], allCD: [C, D][], where?: (a: A, b: B, c: C, d: D) => boolean): [A, B, C, D][] {
        let jointure: [A, B, C, D][] = [];
        for (let ab of allAb) {
            for (let cd of allCD) {
                if (where == null || where(ab[0], ab[1], cd[0], cd[1]))
                    jointure.push([ab[0], ab[1], cd[0], cd[1]]);
            }
        }
        return jointure;
    }

    static Select23<A, B, C, D, E>(allAb: [A, B][], allCDE: [C, D, E][], where?: (ab: [A, B], cde: [C, D, E]) => boolean): [A, B, C, D, E][] {
        let jointure: [A, B, C, D, E][] = [];
        for (let ab of allAb) {
            for (let cde of allCDE) {
                if (where == null || where(ab, cde))
                    jointure.push([ab[0], ab[1], cde[0], cde[1], cde[2]]);
            }
        }
        return jointure;
    }

    static Select12<T, U, V>(allT: T[], allUVs: [U, V][], where?: (t: T, u: U, v: V) => boolean): [T, U, V][] {
        let jointure: [T, U, V][] = [];
        for (let t of allT) {
            for (let uv of allUVs) {
                if (where == null || where(t, uv[0], uv[1]))
                    jointure.push([t, uv[0], uv[1]]);
            }
        }
        return jointure;
    }

    static Select122<T, U, V, W, X>(allT: T[], allUV: [U, V][], allWX: [W, X][], where?: (t: T, u: U, v: V, w: W, x: X) => boolean): [T, U, V, W, X][] {
        let jointure: [T, U, V, W, X][] = [];
        for (let t of allT) {
            for (let uv of allUV) {
                for (let wx of allWX) {
                    if (where == null || where(t, uv[0], uv[1], wx[0], wx[1]))
                        jointure.push([t, uv[0], uv[1], wx[0], wx[1]]);
                }
            }
        }
        return jointure;
    }

    static Select13<T, U, V, W>(allT: T[], allUVWs: [U, V, W][], where?: (t: T, u: U, v: V, w: W) => boolean): [T, U, V, W][] {
        let jointure: [T, U, V, W][] = [];
        for (let t of allT) {
            for (let uvw of allUVWs) {
                if (where == null || where(t, uvw[0], uvw[1], uvw[2]))
                    jointure.push([t, uvw[0], uvw[1], uvw[2]]);
            }
        }
        return jointure;
    }

    static Select21<T, U, V>(allTU: [T, U][], allVs: V[], where?: (t: T, u: U, v: V) => boolean): [T, U, V][] {
        let jointure: [T, U, V][] = [];
        for (let tu of allTU) {
            for (let v of allVs) {
                if (where == null || where(tu[0], tu[1], v))
                    jointure.push([tu[0], tu[1], v]);
            }
        }
        return jointure;
    }

    static Select31<T, U, V, W>(allTUV: [T, U, V][], allWs: W[], where?: (t: T, u: U, v: V, w: W) => boolean): [T, U, V, W][] {
        let jointure: [T, U, V, W][] = [];
        for (let tuv of allTUV) {
            for (let w of allWs) {
                if (where == null || where(tuv[0], tuv[1], tuv[2], w))
                    jointure.push([tuv[0], tuv[1], tuv[2], w]);
            }
        }
        return jointure;
    }

    static Select32<T, U, V, W, X>(allTUV: [T, U, V][], allWXs: [W, X][], where?: (t: T, u: U, v: V, w: W, x: X) => boolean): [T, U, V, W, X][] {
        let jointure: [T, U, V, W, X][] = [];
        for (let tuv of allTUV) {
            for (let wx of allWXs) {
                if (where == null || where(tuv[0], tuv[1], tuv[2], wx[0], wx[1]))
                    jointure.push([tuv[0], tuv[1], tuv[2], wx[0], wx[1]]);
            }
        }
        return jointure;
    }

    static Select33<T, U, V, W, X, Y>(allTUV: [T, U, V][], allWXYs: [W, X, Y][], where?: (t: T, u: U, v: V, w: W, x: X, y: Y) => boolean): [T, U, V, W, X, Y][] {
        let jointure: [T, U, V, W, X, Y][] = [];
        for (let tuv of allTUV) {
            for (let wxy of allWXYs) {
                if (where == null || where(tuv[0], tuv[1], tuv[2], wxy[0], wxy[1], wxy[2]))
                    jointure.push([tuv[0], tuv[1], tuv[2], wxy[0], wxy[1], wxy[2]]);
            }
        }
        return jointure;
    }

    static Select41<T, U, V, W, X>(allTUV: [T, U, V, W][], allXs: X[], where?: (t: T, u: U, v: V, w: W, x: X) => boolean): [T, U, V, W, X][] {
        let jointure: [T, U, V, W, X][] = [];
        for (let tuv of allTUV) {
            for (let x of allXs) {
                if (where == null || where(tuv[0], tuv[1], tuv[2], tuv[3], x))
                    jointure.push([tuv[0], tuv[1], tuv[2], tuv[3], x]);
            }
        }
        return jointure;
    }

    static Select51<T, U, V, W, X, Y>(allTUV: [T, U, V, W, X][], allYs: Y[], where?: (t: T, u: U, v: V, w: W, x: X, y: Y) => boolean): [T, U, V, W, X, Y][] {
        let jointure: [T, U, V, W, X, Y][] = [];
        for (let tuv of allTUV) {
            for (let y of allYs) {
                if (where == null || where(tuv[0], tuv[1], tuv[2], tuv[3], tuv[4], y))
                    jointure.push([tuv[0], tuv[1], tuv[2], tuv[3], tuv[4], y]);
            }
        }
        return jointure;
    }

    static GroupBy1<T, U>(allT: T[], propertyFunc: (t: T) => U): T[][] {
        let groups: T[][] = [];
        let keys = new Set<U>();
        for (let t of allT) {
            keys.add(propertyFunc(t));
        }

        for (let key of keys) {
            let elementsInGroup: T[] = allT.filter(t => propertyFunc(t) == key);
            groups.push(elementsInGroup);
        }

        return groups;
    }

    static GroupBy2<T, U>(allT: T[], allUs: U[], where: (t: T, u: U) => boolean, includeEmptyGroups: boolean): [T, U[]][] {
        let groups: [T, U[]][] = [];
        for (let t of allT) {
            let elementsInGroup: U[] = [];
            for (let u of allUs) {
                if (where == null || where(t, u))
                    elementsInGroup.push(u);
            }

            if (includeEmptyGroups)
                groups.push([t, elementsInGroup]);
            else if (elementsInGroup.length > 0) {
                groups.push([t, elementsInGroup]);
            }
        }
        return groups;
    }
}


