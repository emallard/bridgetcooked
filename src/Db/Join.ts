export class Join {

    static Join2<T, U>(allT: T[], allU: U[], tFunc: (t: T) => string, uFunc: (u: U) => string): [T, U][] {
        let jointure: [T, U][] = [];
        for (let t of allT) {
            let tid = tFunc(t);
            for (let u of allU) {
                let uid = uFunc(u);
                if (tid == uid)
                    jointure.push([t, u]);
            }
        }
        return jointure;
    }



    static Join3<T, U, V>(allT: T[], allU: U[], allV: V[], tFunc: (t: T) => string, uFunc: (u: U) => string, vFunc: (v: V) => string): [T, U, V][] {
        let jointure: [T, U, V][] = [];
        for (let t of allT) {
            let tid = tFunc(t);
            for (let u of allU) {
                let uid = uFunc(u);
                if (uid != tid)
                    continue;
                for (let v of allV) {
                    let vid = vFunc(v);
                    if (tid != vid)
                        continue;
                    jointure.push([t, u, v]);
                }
            }
        }
        return jointure;
    }
    static Join4<T, U, V, W>(allT: T[], allU: U[], allV: V[], allW: W[], tFunc: (t: T) => string, uFunc: (u: U) => string, vFunc: (v: V) => string, wFunc: (w: W) => string): [T, U, V, W][] {
        let jointure: [T, U, V, W][] = [];
        for (let t of allT) {
            let tid = tFunc(t);
            for (let u of allU) {

                let uid = uFunc(u);
                if (uid != tid)
                    continue;

                for (let v of allV) {
                    let vid = vFunc(v);
                    if (tid != vid)
                        continue;

                    for (let w of allW) {
                        let wid = wFunc(w);
                        if (tid != wid)
                            continue;
                        jointure.push([t, u, v, w]);
                    }

                }
            }
        }
        return jointure;
    }

    static Join5<T, U, V, W, X>(allT: T[], allU: U[], allV: V[], allW: W[], allX: X[], tFunc: (t: T) => string, uFunc: (u: U) => string, vFunc: (v: V) => string, wFunc: (w: W) => string, xFunc: (x: X) => string): [T, U, V, W, X][] {
        let jointure: [T, U, V, W, X][] = [];
        for (let t of allT) {
            let tid = tFunc(t);
            for (let u of allU) {

                let uid = uFunc(u);
                if (uid != tid)
                    continue;

                for (let v of allV) {
                    let vid = vFunc(v);
                    if (tid != vid)
                        continue;

                    for (let w of allW) {
                        let wid = wFunc(w);
                        if (tid != wid)
                            continue;

                        for (let x of allX) {
                            let xid = xFunc(x);
                            if (tid != xid)
                                continue;

                            jointure.push([t, u, v, w, x]);
                        }

                    }
                }
            }
        }
        return jointure;
    }
}
