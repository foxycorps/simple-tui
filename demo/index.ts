import UI, { ESC, Screen } from "../src";
const l = console.log;

export const bar = ":=======================================================:"

class MainMenu extends Screen {
    constructor() {
        super("Main Menu")
    }

    public handleKeys(key: string): void {
        switch (key) {
            case 'Q':
                process.exit();
            case 'S':
                // We will change the screen to the settings screen.
                UI.changeScreen("settings");
        }
    }

    render(): void {
        l(bar);
        l();
        l(`     R - Reload          |      S - Settings      `);
        l(`     D - Dev Tools       |      I - Inspector      `);
        l(`     i - IOS App         |      Q - Quit      `);
        l();
        l(bar);
    }
}

export class Settings extends Screen {
    constructor() {
        super("settings");
    }

    handleKeys(key: string): void {
        switch (key) {
            case ESC:
                UI.changeScreen(0);
        }
    }

    render(): void {
        l(bar);
        l();
        l(`     d - Toggle Debug          |      ESC - Go Back      `);
        l();
        l(bar);
    }
}

(()=>{
    UI.registerMainMenu(new MainMenu());
    UI.registerScreen(new Settings());
    UI.start();
})();