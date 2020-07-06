
declare module "yargs" {

  declare type Argv<T> = {|
    ...T,
    _: Array<string>,
    $0: string,
  |};

  declare type Options = $Shape<{
    alias: string | Array<string>,
    array: boolean,
    boolean: boolean,
    choices: Array<mixed>,
    coerce: (arg: {[key: string]: any} | any) => mixed,
    config: boolean,
    configParser: (configPath: string) => { [key: string]: mixed, ... },
    conflicts: string | Array<string> | { [key: string]: string, ... },
    count: boolean,
    default: mixed,
    defaultDescription: string,
    demandOption: boolean | string,
    desc: string,
    describe: string,
    description: string,
    global: boolean,
    group: string,
    implies: string | { [key: string]: string, ... },
    nargs: number,
    normalize: boolean,
    number: boolean,
    required: boolean,
    requiresArg: boolean,
    skipValidation: boolean,
    string: boolean,
    type: "array" | "boolean" | "count" | "number" | "string",
    ...
  }>;

  declare type CommonModuleObject = {|
    command?: string | Array<string>,
    aliases?: Array<string> | string,
    // TODO infer Argv
    builder?: OptionMap | ((yargsInstance: Yargs<{||}>) => Yargs<U>),
    handler?: ((argv: Argv<U>) => void)
  |};

  declare type ModuleObjectDesc = {|
    ...CommonModuleObject,
    desc?: string | false
  |};

  declare type ModuleObjectDescribe = {|
    ...CommonModuleObject,
    describe?: string | false
  |};

  declare type ModuleObjectDescription = {|
    ...CommonModuleObject,
    description?: string | false
  |};

  declare type ModuleObject =
    | ModuleObjectDesc
    | ModuleObjectDescribe
    | ModuleObjectDescription;

  declare class Yargs<T = {||}> {
    (args: Array<string>): Yargs<T>;

    alias(key: string, alias: string): this;
    alias(alias: { [key: string]: string | Array<string>, ... }): this;
    argv: Argv<T>;
    array(key: string | Array<string>): this;
    boolean(parameter: string | Array<string>): this;
    check(fn: (argv: Argv<T>, options: Array<string>) => ?boolean): this;
    choices(key: string, allowed: Array<string>): this;
    choices(allowed: { [key: string]: Array<string>, ... }): this;
    coerce(key: string, fn: (value: any) => mixed): this;
    coerce(object: { [key: string]: (value: any) => mixed, ... }): this;
    coerce(keys: Array<string>, fn: (value: any) => mixed): this;

    // TODO infer Argv
    command(
      command: string | Array<string>,
      description: string | false,
      builder?: OptionMap | ((yargsInstance: Yargs<{||}>) => Yargs<U>),
      handler?: (argv:  Argv<U>) => (void | Promise<void>) 
    ): this;

    command(
      command: string | Array<string>,
      description: string | false,
      module: ModuleObject
    ): this;

    command(module: ModuleObject): this;

    commandDir(
      directory: string,
      options?: {
        exclude?: string | Function,
        extensions?: Array<string>,
        include?: string | Function,
        recurse?: boolean,
        visit?: Function,
      },
    ): this;

    completion(
      cmd?: string,
      description?: string | false | (
        current: string,
        argv: Argv<T>,
        done: (compeltion: Array<string>) => void
      ) => ?(Array<string> | Promise<Array<string>>),
      fn?: (
        current: string,
        argv: Argv<T>,
        done: (completion: Array<string>) => void
      ) => ?(Array<string> | Promise<Array<string>>)
    ): this;

    config(
      key?: string,
      description?: string,
      parseFn?: (configPath: string) => { [key: string]: mixed, ... }
    ): this;
    config(
      key: string,
      parseFn?: (configPath: string) => { [key: string]: mixed, ... }
    ): this;
    config(config: { [key: string]: mixed, ... }): this;

    conflicts(key: string, value: string | Array<string>): this;
    conflicts(keys: { [key: string]: string | Array<string>, ... }): this;

    count(name: string): this;

    default(key: string, value: mixed, description?: string): this;
    default(defaults: { [key: string]: mixed, ... }): this;

    // Deprecated: use demandOption() and demandCommand() instead.
    demand(key: string, msg?: string | boolean): this;
    demand(count: number, max?: number, msg?: string | boolean): this;

    demandOption(key: string | Array<string>, msg?: string | boolean): this;

    demandCommand(min: number, minMsg?: string): this;
    demandCommand(
      min: number,
      max: number,
      minMsg?: string,
      maxMsg?: string
    ): this;

    describe(key: string, description: string): this;
    describe(describeObject: { [key: string]: string, ... }): this;

    detectLocale(shouldDetect: boolean): this;

    env(prefix?: string): this;

    epilog(text: string): this;
    epilogue(text: string): this;

    example(cmd: string, desc?: string): this;

    exitProcess(enable: boolean): this;

    fail(fn: (failureMessage: string, err: Error, yargs: this) => mixed): this;

    getCompletion(args: Array<string>, fn: () => void): this;

    global(globals: string | Array<string>, isGlobal?: boolean): this;

    group(key: string | Array<string>, groupName: string): this;

    help(option: boolean): this;

    help(option?: string, desc?: string): this;

    hide(key: string): this;

    implies(key: string, value: string | Array<string>): this;
    implies(keys: { [key: string]: string | Array<string>, ... }): this;

    locale(
      locale: | "de"
      | "en"
      | "es"
      | "fr"
      | "hi"
      | "hu"
      | "id"
      | "it"
      | "ja"
      | "ko"
      | "nb"
      | "pirate"
      | "pl"
      | "pt"
      | "pt_BR"
      | "ru"
      | "th"
      | "tr"
      | "zh_CN"
    ): this;

    locale(): string;

    middleware(
      middlewareCallbacks: 
        | (argv: Argv<T>, yargsInstance?: Yargs<T>) => (void | Promise<void>)
        | Array<(argv: Argv<T>, yargsInstance?: Yargs<T>) => (void | Promise<void>)>
        ,
      applyBeforeValidation?: boolean,
    ): this;

    nargs(key: string, count: number): this;

    normalize(key: string): this;

    number(key: string | Array<string>): this;


    option <Key: string, Options>(key: Key, options?: Options): Yargs<{ ...T, [key: Key]: InferredOptionType<Options>}>;
    // options is an alias for option
    options<Key: string, Options>(key: Key, options?: Options): Yargs<{ ...T, [key: Key]: InferredOptionType<Options>}>;
    
    // other syntax for option
    option <OptionMap>(optionMap: OptionMap): Yargs<{ ...T, ...$ObjMap<OptionMap, InferOptionMap> }>;
    options<OptionMap>(optionMap: OptionMap): Yargs<{ ...T, ...$ObjMap<OptionMap, InferOptionMap> }>;

    parse(
      args?: string | Array<string>,
      context?: { [key: string]: any, ... },
      parseCallback?: (err: Error, argv: Argv<T>, output?: string) => void
    ): Argv<T>;
    parse(
      args?: string | Array<string>,
      parseCallback?: (err: Error, argv: Argv<T>, output?: string) => void
    ): Argv<T>;

    parserConfiguration(configuration: {[key: string]: any}): this;

    pkgConf(key: string, cwd?: string): this;

    positional(key: string, opt?: Options): Yargs<{ ...T, [key: Key]: InferredOptionType<Options>}>;

    recommendCommands(): this;

    // Alias of demand()
    require(key: string, msg: string | boolean): this;
    require(count: number, max?: number, msg?: string | boolean): this;

    requiresArg(key: string | Array<string>): this;

    reset(): this;

    scriptName(name: string): this;

    showCompletionScript(): this;

    showHelp(consoleLevel?: "error" | "warn" | "log"): this;

    showHelpOnFail(enable: boolean, message?: string): this;

    strict(): this;

    skipValidation(key: string): this;

    strict(global?: boolean): this;

    string(key: string | Array<string>): this;

    terminalWidth(): number;

    updateLocale(obj: { [key: string]: string, ... }): this;
    updateStrings(obj: { [key: string]: string, ... }): this;

    // TODO infer Argv and add other valid ways to call
    usage(message: string, opts?: OptionMap): this;

    version(): this;
    version(version: string | false): this;
    version(option: string | (() => string), version: string): this;
    version(
      option: string | (() => string),
      description: string | (() => string),
      version: string
    ): this;

    wrap(columns: number | null): this;
  }

  declare module.exports: Yargs<{||}>;

  declare type InferredOptionType<Opts> = $Call<
    & ((o: { type: "count", ... }) => number)
    & ((o: { count: true }) => number)
    & ((o: { required: string | true, ... }) => $NonMaybeType<MaybeOption<Opts>>)
    & ((o: { required: string | true, ... }) => $NonMaybeType<MaybeOption<Opts>>)
    & ((o: { demand: string | true, ... }) => $NonMaybeType<MaybeOption<Opts>>)
    & ((o: { default: mixed} ) => mixed)
    & ((o: mixed) => MaybeOption<Opts>)
    ,
    Opts
  >;

  declare type MaybeOption<Opts> = $Call<
    & ((o: { type: "array", string: true }) => ?Array<string>)
    & ((o: { type: "array", number: true }) => ?Array<number>)
    & ((o: { type: "array", normalize: true }) => ?Array<string>)
    & ((o: { array: true, type: "number" }) => ?Array<number>)
    & ((o: { array: true, type: "string" }) => ?Array<string>)

    & ((o: { array: true, string: true }) => ?Array<string>)
    & ((o: { array: true, number: true }) => ?Array<number>)
    & ((o: { array: true, normalize: true }) => ?Array<string>)

    & ((o: { type: "array" }) => ?Array<string | number>)
    & ((o: { array: true }) => ?Array<string | number>)

    & ((o: { type: "number" }) => ?number)
    & ((o: { type: "boolean" }) => ?boolean)
    & ((o: { type: "string" }) => ?string)

    & ((o: { string: true }) => ?string)
    & ((o: { number: true }) => ?number)
    & ((o: { boolean: true }) => ?boolean)

    & ((o: { normalize: true }) => ?string)

    // TODO get choice types to be strictly enforced
    & ((o: { choices: mixed }) => mixed)
    & ((o: {||}) => mixed)
    ,
    Opts
  >;

  declare type OptionMap = { [key: string]: Options, ...};

  declare type InferOptionMap = <Opts>(o: Opts) => InferredOptionType<Opts>;
}
