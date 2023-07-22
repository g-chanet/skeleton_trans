declare namespace Game {
    interface GameConfig {
      fps?: number;
      width?: number;
      height?: number;
      stats?: boolean;
    }
  
    interface GameInstance {
      update(dt: number): void;
      draw(ctx: CanvasRenderingContext2D): void;
      onkeydown?(keyCode: number): void;
      onkeyup?(keyCode: number): void;
    }
  
    interface GameStats {
      count: number;
      fps: number;
      update: number;
      draw: number;
      frame: number;
    }
  
    interface Runner {
      initialize(id: string, game: GameInstance, cfg?: GameConfig): void;
      start(): void;
      stop(): void;
      loop(): void;
      update(dt: number): void;
      draw(): void;
      resetStats(): void;
      updateStats(update: number, draw: number): void;
      drawStats(ctx: CanvasRenderingContext2D): void;
      addEvents(): void;
      onkeydown(ev: KeyboardEvent): void;
      onkeyup(ev: KeyboardEvent): void;
      hideCursor(): void;
      showCursor(): void;
      alert(msg: string): void;
      confirm(msg: string): void;
    }
  
    interface UserAgentInfo {
      full: string;
      name: string;
      version: number | null;
      isFirefox: boolean;
      isChrome: boolean;
      isSafari: boolean;
      isOpera: boolean;
      isIE: boolean;
      hasCanvas: boolean;
      hasAudio: boolean;
    }
  
    function compatible(): boolean;
    function start(id: string, game: GameInstance, cfg?: GameConfig): GameInstance;
    function addEvent(obj: EventTarget, type: string, fn: EventListenerOrEventListenerObject): void;
    function removeEvent(obj: EventTarget, type: string, fn: EventListenerOrEventListenerObject): void;
    function ready(fn: () => void): void;
    function createCanvas(): HTMLCanvasElement;
    function createAudio(src: string): HTMLAudioElement | null;
    function loadImages(sources: string[], callback: (images: Record<string, HTMLImageElement>) => void): void;
    function random(min: number, max: number): number;
    function timestamp(): number;
  
    const KEY: {
      BACKSPACE: number;
      TAB: number;
      RETURN: number;
      ESC: number;
      SPACE: number;
      LEFT: number;
      UP: number;
      RIGHT: number;
      DOWN: number;
      DELETE: number;
      HOME: number;
      END: number;
      PAGEUP: number;
      PAGEDOWN: number;
      INSERT: number;
      ZERO: number;
      ONE: number;
      TWO: number;
      A: number;
      L: number;
      P: number;
      Q: number;
      TILDA: number;
    }
  
    const ua: UserAgentInfo
  }
  
  declare const Game: {
    compatible(): boolean;
    start(id: string, game: Game.GameInstance, cfg?: Game.GameConfig): Game.GameInstance;
    addEvent(obj: EventTarget, type: string, fn: EventListenerOrEventListenerObject): void;
    removeEvent(obj: EventTarget, type: string, fn: EventListenerOrEventListenerObject): void;
    ready(fn: () => void): void;
    createCanvas(): HTMLCanvasElement;
    createAudio(src: string): HTMLAudioElement | null;
    loadImages(sources: string[], callback: (images: Record<string, HTMLImageElement>) => void): void;
    random(min: number, max: number): number;
    timestamp(): number;
    KEY: {
      BACKSPACE: number;
      TAB: number;
      RETURN: number;
      ESC: number;
      SPACE: number;
      LEFT: number;
      UP: number;
      RIGHT: number;
      DOWN: number;
      DELETE: number;
      HOME: number;
      END: number;
      PAGEUP: number;
      PAGEDOWN: number;
      INSERT: number;
      ZERO: number;
      ONE: number;
      TWO: number;
      A: number;
      L: number;
      P: number;
      Q: number;
      TILDA: number;
    };
  }
  
  export = Game;
  