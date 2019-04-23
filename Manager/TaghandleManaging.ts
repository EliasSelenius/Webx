

namespace webx.Manager.DOMHandlers {

    const Taghandles: Taghandle[] = []; 

    export const FetchHandleOf = (el: HTMLElement): Taghandle => {
        let tag;

        tag = Taghandles.filter(e => e.el == el)[0];

        if(!tag) {
            console.log('new Tag Insted....');
            tag = new Taghandle(el);
            Taghandles.push(tag);
        }

        return tag;
    }

}