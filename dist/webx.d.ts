declare namespace webx {
    class Taghandle {
        readonly el: HTMLElement;
        readonly behaviors: Behavior[];
        readonly refs: {
            [key: string]: Taghandle;
        };
        constructor(el: HTMLElement);
        UpdateRefs(): void;
    }
    class TaghandleUser {
        readonly tag: Taghandle;
        readonly el: HTMLElement;
        readonly refs: {
            [key: string]: Taghandle;
        };
        constructor(el: HTMLElement);
    }
}
declare namespace webx {
    abstract class Behavior extends TaghandleUser {
        constructor(el: HTMLElement);
        Start(): void;
    }
}
declare namespace webx {
    abstract class Component extends TaghandleUser {
        constructor(el: HTMLElement);
        Start(): void;
    }
}
declare namespace webx.Manager.Behaviors {
}
declare namespace webx.Manager.Components {
    const Init: <T extends Component>(type: new (el: HTMLElement) => T, templatename?: string | undefined) => void;
    const InitAllInDOM: () => void;
}
declare namespace webx.Manager.DOMHandlers {
    const FetchHandleOf: (el: HTMLElement) => Taghandle;
}
declare namespace webx.Utils {
    const IsNullOrWhitespace: (str: string | null) => boolean;
    const FixJson: (json: string) => string;
    const DerivesFrom: (a: any, b: any) => boolean;
}
