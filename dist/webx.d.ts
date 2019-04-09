declare abstract class Behavior {
    readonly element: HTMLElement;
    constructor(el: HTMLElement);
    Start(): void;
}
declare class Component {
}
declare namespace Utils {
    const IsNullOrWhitespace: (str: string | null) => boolean;
    const FixJson: (json: string) => string;
    const DerivesFrom: (a: any, b: any) => boolean;
}
