


namespace Utils {


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

}