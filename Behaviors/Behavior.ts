
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

