declare abstract class Behavior {
    element: HTMLElement;
    constructor(el: HTMLElement);
}
declare namespace Utils {
    const IsNullOrWhitespace: (str: string | null) => boolean;
    const FixJson: (json: string) => string;
}
