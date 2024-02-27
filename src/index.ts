import { CTRL_C, CTRL_D, CTRL_L, ESC, clear } from "./consts";
import { KeyPressHandler } from "./keyPressHandler";
import { Registry } from "./registry";
import { Screen } from "./screen";

export default class UIEngine {
    private static currentMenu: number = 0; // This tells the system to load the first screen loaded.
    private static keyHandler: ((key: string) => void);
    private static screenStack: Screen[] = []; // This is going to be the list of all the screens.

    public static registry: Registry;
    private static keyPressHandler: KeyPressHandler;
    private static listener: any;

    public static registerScreen(screen: Screen) {
        this.screenStack.push(screen);
    }

    public static registerMainMenu(screen: Screen) {
        // We will put this at the front of the stack... as it is the one that should load first.
        this.screenStack.unshift(screen);
    }

    public static registerListener(listener: any): void {
      this.listener = listener;
    }

    public static changeScreen(screenPosition: number |  string) {
        if (typeof screenPosition === "string") {
            // We will loop through the stack and find the screen that matches the name.
            let foundScreen = this.screenStack.findIndex((screen) => screen.screenName === screenPosition);
            if (foundScreen === -1) {
                // We will throw an error as we could not find the screen.
                throw new Error(`Could not find screen with name: ${screenPosition}`);
            }
            // We will now set the screen position to the index of the screen.
            screenPosition = foundScreen;
        }
        this.currentMenu = screenPosition;
        // We are going to ask the new screen to render.
        this.display();
        // We are also going to attach the key handler
        UIEngine.keyHandler = this.screenStack[screenPosition].handleKeys;
    }

    public static start() {
        if (!this.screenStack.length) {
            throw new Error("No screens have been registered.");;
        }

        UIEngine.display();

        this.keyPressHandler = new KeyPressHandler(this.handleKeyPress);
        this.listener = this.keyPressHandler.createInteractionListener();
        this.registry = new Registry(this.listener);
        this.keyPressHandler.startIntercepting();

        this.keyHandler = this.screenStack[0].handleKeys;

        this.display();
    }

    public static display() {
        clear();

        this.screenStack[this.currentMenu].render();
    }

    private static async handleKeyPress(key: string) {
        switch (key) {
            case CTRL_L:
                return UIEngine.display();
            case CTRL_C:
            case CTRL_D:
                UIEngine.registry.pause();
                try {
                    process.emit('SIGINT');
                    process.exit()
                } catch (error) {
                    throw error;
                }
        }

        // We are now going to use the key handler from the current screen.
        UIEngine.keyHandler(key);
    }

    public static rerenderOn(events: string[]): void {
      for (const event of events) {
        this.listener.on(event, {
          UIEngine.display();
        })
      }
    }
}

export { CTRL_C, CTRL_D, CTRL_L, ESC, Screen, clear };
