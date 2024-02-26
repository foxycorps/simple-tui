declare const CTRL_C = "\u0003";
declare const CTRL_L = "\f";
declare const CTRL_D = "\u0004";
declare const ESC = "ESC";
declare const clear: () => void;

declare class Registry {
    private listener;
    constructor(listener: any);
    pause(): void;
    resume(): void;
}

declare class Screen {
    private name;
    constructor(name: string);
    handleKeys(key: string): void;
    render(): void;
    get screenName(): string;
}

declare class UIEngine {
    private static currentMenu;
    private static keyHandler;
    private static screenStack;
    static registry: Registry;
    private static keyPressHandler;
    private static listener;
    static registerScreen(screen: Screen): void;
    static registerMainMenu(screen: Screen): void;
    static changeScreen(screenPosition: number | string): void;
    static start(): void;
    static display(): void;
    private static handleKeyPress;
}

export { CTRL_C, CTRL_D, CTRL_L, ESC, Screen, clear, UIEngine as default };
