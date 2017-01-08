// Extra variables from Global that'll be replaced by webpack DefinePlugin

// support NodeJS modules without type definitions
declare module '*';

declare var $: JQueryStatic;
declare var ENV: string;
declare var HMR: boolean;
declare var System: SystemJS;
declare var jquery: JQueryStatic;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

interface GlobalEnvironment {
  ENV: string;
  HMR: boolean;
  SystemJS: SystemJS;
  System: SystemJS;
}

interface Es6PromiseLoader {
  (id: string): (exportName?: string) => Promise<any>;
}

type FactoryEs6PromiseLoader = () => Es6PromiseLoader;
type FactoryPromise = () => Promise<any>;

type AsyncRoutes = {
  [component: string]: Es6PromiseLoader |
                               Function |
                FactoryEs6PromiseLoader |
                         FactoryPromise
};


type IdleCallbacks = Es6PromiseLoader |
                             Function |
              FactoryEs6PromiseLoader |
                       FactoryPromise ;

interface WebpackModule {
  hot: {
    data?: any,
    idle: any,
    accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
    decline(deps?: any | string | string[]): void;
    dispose(callback?: (data?: any) => void): void;
    addDisposeHandler(callback?: (data?: any) => void): void;
    removeDisposeHandler(callback?: (data?: any) => void): void;
    check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    status(callback?: (status?: string) => void): void | string;
    removeStatusHandler(callback?: (status?: string) => void): void;
  };
}


interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
    context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}


// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeRequireFunction extends Es6PromiseLoader  {}
interface NodeModule extends WebpackModule {}
interface Global extends GlobalEnvironment  {}

// We need this here since there is a problem with Zone.js typings
interface Thenable<T> {
  then<U>(
    onFulfilled?: (value: T) => U | Thenable<U>,
    onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
  then<U>(
    onFulfilled?: (value: T) => U | Thenable<U>,
    onRejected?: (error: any) => void): Thenable<U>;
  catch<U>(onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
}

// Type definitions for fetch API
// Spec: https://fetch.spec.whatwg.org/
// Polyfill: https://github.com/github/fetch
// Definitions by: Ryan Graham <https://github.com/ryan-codingintrigue>

interface FetchOptions {
	method: string;
	headers: any;
	body: any;
}

declare enum ResponseType {
	Basic,
	Cors,
	Default,
	Error,
	Opaque
}

interface Headers {
	append(name: string, value: string):void;
	delete(name: string):void;
	get(name: string): string;
	getAll(name: string): Array<string>;
	has(name: string): boolean;
	set(name: string, value: string): void;
}

interface Body {
	bodyUsed: boolean;
	arrayBuffer(): Promise<ArrayBuffer>;
	blob(): Promise<Blob>;
	formData(): Promise<FormData>;
	json(): Promise<JSON>;
	text(): Promise<string>;
}

interface Response extends Body {
	error(): Response;
	redirect(url: string, status?: number): Response;
	type: ResponseType;
	url: string;
	status: number;
	ok: boolean;
	statusText: string;
	headers: Headers;
	clone(): Response;
}

interface Window {
	fetch(url: string): Promise<Response>;
	fetch(url: string, options: FetchOptions): Promise<Response>;
}

// jquery.ContextMenu

interface JQueryContextMenuOptions {
    selector: string;
    appendTo?: string;
    trigger?: string;
    autoHide?: boolean;
    delay?: number;
    determinePosition?: (menu: JQuery) => void;
    position?: (opt: JQuery, x: number, y: number) => void;
    positionSubmenu?: (menu: JQuery) => void;
    zIndex?: number;
    animation?: {
        duration?: number;
        show?: string;
        hide?: string;
    };
    events?: {
        show?: () => void;
        hide?: () => void;
    };
    callback?: (key: any, options: any) => any;
    items: any;
    reposition?: boolean;
    className?: string;
    itemClickEvent?: string;
}

interface JQueryStatic {
    contextMenu(options?: JQueryContextMenuOptions): JQuery;
    contextMenu(type: string, selector?: any): JQuery;
}

interface JQuery {
    contextMenu(options?: any): JQuery;
}

interface JQuery {
    confirm(options?: any);
}

interface JQueryStatic {
    confirm(options?: any);
    confirm: any;
}

// jquery.ContextMenu END

// MariaSQL

// Type definitions for mariasql v0.1.22
// Project: https://github.com/mscdex/node-mariasql
// Definitions by: MichaelBennett <https://github.com/bennett000/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace mariasql {
    export interface MariaCallBackError {
        (error:Error):void
    }

    export interface MariaCallBackResult {
        (result:MariaResult):void
    }

    export interface MariaCallBackRow {
        (result:Array<any>):void
    }

    export interface MariaCallBackBoolean {
        (result:boolean):void
    }

    export interface MariaCallBackObject {
        (result:Object):void
    }

    export interface MariaCallBackInfo {
        (result:MariaInfo):void
    }

    export interface MariaCallBackVoid {
        ():void
    }

    export interface Dictionary {
        [index: string]: any;
    }

    export interface MariaInfo {
        affectedRows: number;
        insertId: number;
        numRows: number
    }

    export interface MariaPreparedQuery {
        (values:Dictionary):string;
        (values:Array<any>):string;
    }

    export interface ClientConfig {
        host: string;
        user: string;
        password: string;
        db?: string;
        port?: number;
        unixSocket?: string;
        keepQueries?: boolean;
        multiStatements?: boolean;
        connTimeout?: number;
        pingInterval?: number;
        secureAuth?: boolean;
        compress?: boolean;
        ssl?:any;
        local_infile?: boolean;
        read_default_group?: string;
        charset?: string;
    }

    export interface MariaResult {
        on(signal:'end', cb:MariaCallBackInfo):MariaResult;
        on(signal:'error', cb:MariaCallBackError):MariaResult;
        on(signal:'row', cb:MariaCallBackRow):MariaResult;
        on(signal:'abort', cb:MariaCallBackVoid):MariaResult;
        on(signal:string, cb:MariaCallBackVoid):MariaResult;
        abort():void;
    }

    export interface MariaQuery {
        on(signal:'result', cb:MariaCallBackResult):MariaQuery;
        on(signal:'end', cb:MariaCallBackVoid):MariaQuery;
        on(signal:'abort', cb:MariaCallBackVoid):MariaQuery;
        on(signal:'error', cb:MariaCallBackError):MariaQuery;
        on(signal:string, cb:MariaCallBackVoid):MariaQuery;
        abort():void;
    }

    export interface MariaClient {
        connect(config:ClientConfig):void;
        end():void;
        destroy():void;
        escape(query:string):string;
        query(q:string, placeHolders?:Dictionary, useArray?:boolean):MariaQuery;
        query(q:string, placeHolders?:Array<any>, useArray?:boolean):MariaQuery;
        query(q:string, useArray?:boolean):MariaQuery;
        prepare(query:string): MariaPreparedQuery;
        isMariaDB():boolean;
        on(signal:'error', cb:MariaCallBackError): MariaClient;
        on(signal:'close', cb:MariaCallBackObject): MariaClient;
        on(signal:'connect', cb:MariaCallBackVoid): MariaClient;
        on(signal:string, cb:MariaCallBackVoid): MariaClient;
        connected: boolean;
        threadId: string;
    }

    export interface Client {
        new ():MariaClient;
        ():MariaClient;
        prototype: MariaClient;
    }
}
