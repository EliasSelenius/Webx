

console.log('webx loaded...');


window.onload = function() {



    // look for behavior attributes
    let all = document.body.querySelectorAll('*');
    all.forEach((v, index) => {
        let at = v.getAttribute('behavior');
        if(at !== null) {

            let behaviors = at.split(';');

            for(const beh of behaviors) {
                let charindex = beh.indexOf('{');
                if (charindex === -1) { charindex = beh.length; }
                const name = beh.substring(0, charindex);
                const namepath = name.split('.');
                let type = (<any>window)[namepath[0]];
                for(const seg of namepath.slice(1)) {
                    type = type[seg];
                }


                if(!Utils.DerivesFrom(type, Behavior)) {
                    console.error(name + ' is not a valid behavior');
                    continue;
                }
                const inst = new type(v);

                const rawjsontxt = beh.substring(charindex, beh.length);
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
                //console.log(inst);
            }
        }
    });
}



