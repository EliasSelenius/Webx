

namespace webx.Manager.Components {

    const Templates: { 
        [key: string]: { 
            type: (new (el: HTMLElement) => Component),
            template: string 
        } 
    } = {};

    export const Init = function<T extends Component>(type: (new (el: HTMLElement) => T), templatename?: string) {
        const compName = <string>(templatename ? templatename : type.prototype.constructor.name);

        fetch(compName + '.html')
        .then(r => {
            return r.text();
        })
        .then(r => {
            console.log(r);
            Templates[compName] = { type: type, template: r };
        }, r => {
            console.log("dwadwad");
        });
    }


    export const InitAllInDOM = function() {
        for (const key in Templates) {
            if (Templates.hasOwnProperty(key)) {
                const allelms = document.body.querySelectorAll(key);
                allelms.forEach(e => {
                    const c = new Templates[key].type(<HTMLElement>e);
                    c.el.innerHTML = Templates[key].template;
                    c.tag.UpdateRefs();
                    c.Start();
                });
                
            }
        }
    }

    window.addEventListener('load', InitAllInDOM);

}