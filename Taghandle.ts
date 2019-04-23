

namespace webx {

    // wrapper class for HTMLElement.
    // this class adds extra data to an HTMLElement
    export class Taghandle {
        public readonly el: HTMLElement;
        public readonly behaviors: Behavior[] = [];
        public readonly refs: { [key: string]: Taghandle } = {};

        constructor(el: HTMLElement) {
            this.el = el;
            this.UpdateRefs();
        }

        public UpdateRefs() {
            const all = this.el.querySelectorAll('*');
            all.forEach( e => {
                const at = e.getAttribute('ref');
                if(at) {
                    this.refs[at] = Manager.DOMHandlers.FetchHandleOf(<HTMLElement>e);
                }
            })
        }
    }

    // any class that is somehow assosiated with an HTML DOM element will extend this class
    // it adds reference to the wrapper class for that DOM element
    // and exposes wrapper methods for DOM manipulation
    export class TaghandleUser {
        public readonly tag: Taghandle;
        public get el() {
            return this.tag.el;
        }
        public get refs() {
            return this.tag.refs;
        }

        constructor(el: HTMLElement) {
            this.tag = Manager.DOMHandlers.FetchHandleOf(el);
            this.tag.UpdateRefs();
        }
    }

}