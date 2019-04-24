
/// <reference path="../Taghandle.ts" />

namespace webx {
    export abstract class Behavior extends TaghandleUser {

        constructor(el: HTMLElement) {
            super(el);
            this.tag.behaviors.push(this);

            //this.Start();
        }
    
    
        Start() { }
    
    } 
}
/*
    constructor(el: HTMLElement) {
        this.element = el;

        this.element.onclick = e => this.OnClick(e);
    }


    Start(): void { }

    OnClick(e: MouseEvent): void { }

    


    //#region static string initing
    public static InitFromString(str: string, element: HTMLElement): Behavior | null {
        let charindex = str.indexOf('{');
        if (charindex === -1) { charindex = str.length; }
        const name = str.substring(0, charindex);
        const namepath = name.split('.');
        let type = (<any>window)[namepath[0]];
        for(const seg of namepath.slice(1)) {
            type = type[seg];
        }
        if(!type) {
            console.error(name + ' does not exsist');
            return null;
        }

        if(!Utils.DerivesFrom(type, Behavior)) {
            console.error(name + ' does not extend Behavior');
            return null;
        }
        const inst = new type(element);

        const rawjsontxt = str.substring(charindex, str.length);
        if(!Utils.IsNullOrWhitespace(rawjsontxt)) {
            const Json = JSON.parse(Utils.FixJson(rawjsontxt));
            for (const key in Json) {
                if (Json.hasOwnProperty(key) && inst.hasOwnProperty(key)) {
                    inst[key] = Json[key];
                } else {
                    console.error(key + ' is not a valid property in ' + name);
                }
            }
        }

        inst.Start();
        return inst;        
    }

    public static InitBehaviors(str: string, element: HTMLElement): Behavior[] {
        const behaviors: Behavior[] = [];
        const initmarkups = str.split(';');
        for(const markup of initmarkups) {
            const b = Behavior.InitFromString(markup, element);
            if(b) {
                behaviors.push(b);
            }
        }
        return behaviors;
    }

    public static InitAllInBody() {
        const all = document.body.querySelectorAll('*');
        all.forEach((el, i) => {
            const at = el.getAttribute('behavior');
            if(at) {
                Behavior.InitBehaviors(at, <HTMLElement>el);
            }
        });
    }

    public static IsValidFor(el: HTMLElement): boolean {
        const filter = 
    }


    //#endregion
*/

