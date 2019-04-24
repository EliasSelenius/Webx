


namespace webx.Utils {


    export const IsNullOrWhitespace = (str: string | null): boolean => {
        return (str === null) || (str.match(/^\s*$/) !== null);
    }


    export const FixJson = (json: string): string => {
        return json
            // replace colon inside double quote
            .replace(/:\s*"([^"]*)"/g, (match, val) => {
                return ': "' + val.replace(/:/g, '@colon@') + '"';
            })
            // replace colon inside single quote
            .replace(/:\s*'([^']*)'/g, (match, val) => {
                return ': "' + val.replace(/:/g, '@colon@') + '"';
            })
            // place double quotes around key strings
            .replace(/['"]?(\w+)['"]?\s*:/g, '"$1":')
            // replace @colon@ with :
            .replace(/@colon@/g, ':');
    }



    export const DerivesFrom = (a: any, b: any): boolean => {
        return (a && b) && typeof b === 'function' && (a.prototype instanceof b);
    } 


    export const OtherHasAll = (obj: any, other: any): boolean => {
        if(obj && other) {
            for (const key in obj) {
                if (!other.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

}