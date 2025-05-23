
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserMovieDate
 * 
 */
export type UserMovieDate = $Result.DefaultSelection<Prisma.$UserMovieDatePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MovieStatus: {
  FAVORITE: 'FAVORITE',
  WATCHLIST: 'WATCHLIST',
  WATCHED: 'WATCHED'
};

export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus]

}

export type MovieStatus = $Enums.MovieStatus

export const MovieStatus: typeof $Enums.MovieStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserMovieDates
 * const userMovieDates = await prisma.userMovieDate.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserMovieDates
   * const userMovieDates = await prisma.userMovieDate.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userMovieDate`: Exposes CRUD operations for the **UserMovieDate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserMovieDates
    * const userMovieDates = await prisma.userMovieDate.findMany()
    * ```
    */
  get userMovieDate(): Prisma.UserMovieDateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserMovieDate: 'UserMovieDate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userMovieDate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserMovieDate: {
        payload: Prisma.$UserMovieDatePayload<ExtArgs>
        fields: Prisma.UserMovieDateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserMovieDateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserMovieDateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          findFirst: {
            args: Prisma.UserMovieDateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserMovieDateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          findMany: {
            args: Prisma.UserMovieDateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>[]
          }
          create: {
            args: Prisma.UserMovieDateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          createMany: {
            args: Prisma.UserMovieDateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserMovieDateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>[]
          }
          delete: {
            args: Prisma.UserMovieDateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          update: {
            args: Prisma.UserMovieDateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          deleteMany: {
            args: Prisma.UserMovieDateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserMovieDateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserMovieDateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>[]
          }
          upsert: {
            args: Prisma.UserMovieDateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMovieDatePayload>
          }
          aggregate: {
            args: Prisma.UserMovieDateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserMovieDate>
          }
          groupBy: {
            args: Prisma.UserMovieDateGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserMovieDateGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserMovieDateCountArgs<ExtArgs>
            result: $Utils.Optional<UserMovieDateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userMovieDate?: UserMovieDateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model UserMovieDate
   */

  export type AggregateUserMovieDate = {
    _count: UserMovieDateCountAggregateOutputType | null
    _avg: UserMovieDateAvgAggregateOutputType | null
    _sum: UserMovieDateSumAggregateOutputType | null
    _min: UserMovieDateMinAggregateOutputType | null
    _max: UserMovieDateMaxAggregateOutputType | null
  }

  export type UserMovieDateAvgAggregateOutputType = {
    tmdbId: number | null
    rating: number | null
  }

  export type UserMovieDateSumAggregateOutputType = {
    tmdbId: number | null
    rating: number | null
  }

  export type UserMovieDateMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tmdbId: number | null
    status: $Enums.MovieStatus | null
    rating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMovieDateMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tmdbId: number | null
    status: $Enums.MovieStatus | null
    rating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMovieDateCountAggregateOutputType = {
    id: number
    userId: number
    tmdbId: number
    status: number
    rating: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMovieDateAvgAggregateInputType = {
    tmdbId?: true
    rating?: true
  }

  export type UserMovieDateSumAggregateInputType = {
    tmdbId?: true
    rating?: true
  }

  export type UserMovieDateMinAggregateInputType = {
    id?: true
    userId?: true
    tmdbId?: true
    status?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMovieDateMaxAggregateInputType = {
    id?: true
    userId?: true
    tmdbId?: true
    status?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMovieDateCountAggregateInputType = {
    id?: true
    userId?: true
    tmdbId?: true
    status?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserMovieDateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMovieDate to aggregate.
     */
    where?: UserMovieDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMovieDates to fetch.
     */
    orderBy?: UserMovieDateOrderByWithRelationInput | UserMovieDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserMovieDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMovieDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMovieDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserMovieDates
    **/
    _count?: true | UserMovieDateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserMovieDateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserMovieDateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMovieDateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMovieDateMaxAggregateInputType
  }

  export type GetUserMovieDateAggregateType<T extends UserMovieDateAggregateArgs> = {
        [P in keyof T & keyof AggregateUserMovieDate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserMovieDate[P]>
      : GetScalarType<T[P], AggregateUserMovieDate[P]>
  }




  export type UserMovieDateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMovieDateWhereInput
    orderBy?: UserMovieDateOrderByWithAggregationInput | UserMovieDateOrderByWithAggregationInput[]
    by: UserMovieDateScalarFieldEnum[] | UserMovieDateScalarFieldEnum
    having?: UserMovieDateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserMovieDateCountAggregateInputType | true
    _avg?: UserMovieDateAvgAggregateInputType
    _sum?: UserMovieDateSumAggregateInputType
    _min?: UserMovieDateMinAggregateInputType
    _max?: UserMovieDateMaxAggregateInputType
  }

  export type UserMovieDateGroupByOutputType = {
    id: string
    userId: string
    tmdbId: number
    status: $Enums.MovieStatus
    rating: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserMovieDateCountAggregateOutputType | null
    _avg: UserMovieDateAvgAggregateOutputType | null
    _sum: UserMovieDateSumAggregateOutputType | null
    _min: UserMovieDateMinAggregateOutputType | null
    _max: UserMovieDateMaxAggregateOutputType | null
  }

  type GetUserMovieDateGroupByPayload<T extends UserMovieDateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserMovieDateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserMovieDateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserMovieDateGroupByOutputType[P]>
            : GetScalarType<T[P], UserMovieDateGroupByOutputType[P]>
        }
      >
    >


  export type UserMovieDateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tmdbId?: boolean
    status?: boolean
    rating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userMovieDate"]>

  export type UserMovieDateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tmdbId?: boolean
    status?: boolean
    rating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userMovieDate"]>

  export type UserMovieDateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tmdbId?: boolean
    status?: boolean
    rating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userMovieDate"]>

  export type UserMovieDateSelectScalar = {
    id?: boolean
    userId?: boolean
    tmdbId?: boolean
    status?: boolean
    rating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserMovieDateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tmdbId" | "status" | "rating" | "createdAt" | "updatedAt", ExtArgs["result"]["userMovieDate"]>

  export type $UserMovieDatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserMovieDate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tmdbId: number
      status: $Enums.MovieStatus
      rating: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userMovieDate"]>
    composites: {}
  }

  type UserMovieDateGetPayload<S extends boolean | null | undefined | UserMovieDateDefaultArgs> = $Result.GetResult<Prisma.$UserMovieDatePayload, S>

  type UserMovieDateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserMovieDateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserMovieDateCountAggregateInputType | true
    }

  export interface UserMovieDateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserMovieDate'], meta: { name: 'UserMovieDate' } }
    /**
     * Find zero or one UserMovieDate that matches the filter.
     * @param {UserMovieDateFindUniqueArgs} args - Arguments to find a UserMovieDate
     * @example
     * // Get one UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserMovieDateFindUniqueArgs>(args: SelectSubset<T, UserMovieDateFindUniqueArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserMovieDate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserMovieDateFindUniqueOrThrowArgs} args - Arguments to find a UserMovieDate
     * @example
     * // Get one UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserMovieDateFindUniqueOrThrowArgs>(args: SelectSubset<T, UserMovieDateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserMovieDate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateFindFirstArgs} args - Arguments to find a UserMovieDate
     * @example
     * // Get one UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserMovieDateFindFirstArgs>(args?: SelectSubset<T, UserMovieDateFindFirstArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserMovieDate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateFindFirstOrThrowArgs} args - Arguments to find a UserMovieDate
     * @example
     * // Get one UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserMovieDateFindFirstOrThrowArgs>(args?: SelectSubset<T, UserMovieDateFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserMovieDates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserMovieDates
     * const userMovieDates = await prisma.userMovieDate.findMany()
     * 
     * // Get first 10 UserMovieDates
     * const userMovieDates = await prisma.userMovieDate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userMovieDateWithIdOnly = await prisma.userMovieDate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserMovieDateFindManyArgs>(args?: SelectSubset<T, UserMovieDateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserMovieDate.
     * @param {UserMovieDateCreateArgs} args - Arguments to create a UserMovieDate.
     * @example
     * // Create one UserMovieDate
     * const UserMovieDate = await prisma.userMovieDate.create({
     *   data: {
     *     // ... data to create a UserMovieDate
     *   }
     * })
     * 
     */
    create<T extends UserMovieDateCreateArgs>(args: SelectSubset<T, UserMovieDateCreateArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserMovieDates.
     * @param {UserMovieDateCreateManyArgs} args - Arguments to create many UserMovieDates.
     * @example
     * // Create many UserMovieDates
     * const userMovieDate = await prisma.userMovieDate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserMovieDateCreateManyArgs>(args?: SelectSubset<T, UserMovieDateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserMovieDates and returns the data saved in the database.
     * @param {UserMovieDateCreateManyAndReturnArgs} args - Arguments to create many UserMovieDates.
     * @example
     * // Create many UserMovieDates
     * const userMovieDate = await prisma.userMovieDate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserMovieDates and only return the `id`
     * const userMovieDateWithIdOnly = await prisma.userMovieDate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserMovieDateCreateManyAndReturnArgs>(args?: SelectSubset<T, UserMovieDateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserMovieDate.
     * @param {UserMovieDateDeleteArgs} args - Arguments to delete one UserMovieDate.
     * @example
     * // Delete one UserMovieDate
     * const UserMovieDate = await prisma.userMovieDate.delete({
     *   where: {
     *     // ... filter to delete one UserMovieDate
     *   }
     * })
     * 
     */
    delete<T extends UserMovieDateDeleteArgs>(args: SelectSubset<T, UserMovieDateDeleteArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserMovieDate.
     * @param {UserMovieDateUpdateArgs} args - Arguments to update one UserMovieDate.
     * @example
     * // Update one UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserMovieDateUpdateArgs>(args: SelectSubset<T, UserMovieDateUpdateArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserMovieDates.
     * @param {UserMovieDateDeleteManyArgs} args - Arguments to filter UserMovieDates to delete.
     * @example
     * // Delete a few UserMovieDates
     * const { count } = await prisma.userMovieDate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserMovieDateDeleteManyArgs>(args?: SelectSubset<T, UserMovieDateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMovieDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserMovieDates
     * const userMovieDate = await prisma.userMovieDate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserMovieDateUpdateManyArgs>(args: SelectSubset<T, UserMovieDateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMovieDates and returns the data updated in the database.
     * @param {UserMovieDateUpdateManyAndReturnArgs} args - Arguments to update many UserMovieDates.
     * @example
     * // Update many UserMovieDates
     * const userMovieDate = await prisma.userMovieDate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserMovieDates and only return the `id`
     * const userMovieDateWithIdOnly = await prisma.userMovieDate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserMovieDateUpdateManyAndReturnArgs>(args: SelectSubset<T, UserMovieDateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserMovieDate.
     * @param {UserMovieDateUpsertArgs} args - Arguments to update or create a UserMovieDate.
     * @example
     * // Update or create a UserMovieDate
     * const userMovieDate = await prisma.userMovieDate.upsert({
     *   create: {
     *     // ... data to create a UserMovieDate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserMovieDate we want to update
     *   }
     * })
     */
    upsert<T extends UserMovieDateUpsertArgs>(args: SelectSubset<T, UserMovieDateUpsertArgs<ExtArgs>>): Prisma__UserMovieDateClient<$Result.GetResult<Prisma.$UserMovieDatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserMovieDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateCountArgs} args - Arguments to filter UserMovieDates to count.
     * @example
     * // Count the number of UserMovieDates
     * const count = await prisma.userMovieDate.count({
     *   where: {
     *     // ... the filter for the UserMovieDates we want to count
     *   }
     * })
    **/
    count<T extends UserMovieDateCountArgs>(
      args?: Subset<T, UserMovieDateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserMovieDateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserMovieDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserMovieDateAggregateArgs>(args: Subset<T, UserMovieDateAggregateArgs>): Prisma.PrismaPromise<GetUserMovieDateAggregateType<T>>

    /**
     * Group by UserMovieDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMovieDateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserMovieDateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserMovieDateGroupByArgs['orderBy'] }
        : { orderBy?: UserMovieDateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserMovieDateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserMovieDateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserMovieDate model
   */
  readonly fields: UserMovieDateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserMovieDate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserMovieDateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserMovieDate model
   */
  interface UserMovieDateFieldRefs {
    readonly id: FieldRef<"UserMovieDate", 'String'>
    readonly userId: FieldRef<"UserMovieDate", 'String'>
    readonly tmdbId: FieldRef<"UserMovieDate", 'Int'>
    readonly status: FieldRef<"UserMovieDate", 'MovieStatus'>
    readonly rating: FieldRef<"UserMovieDate", 'Int'>
    readonly createdAt: FieldRef<"UserMovieDate", 'DateTime'>
    readonly updatedAt: FieldRef<"UserMovieDate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserMovieDate findUnique
   */
  export type UserMovieDateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter, which UserMovieDate to fetch.
     */
    where: UserMovieDateWhereUniqueInput
  }

  /**
   * UserMovieDate findUniqueOrThrow
   */
  export type UserMovieDateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter, which UserMovieDate to fetch.
     */
    where: UserMovieDateWhereUniqueInput
  }

  /**
   * UserMovieDate findFirst
   */
  export type UserMovieDateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter, which UserMovieDate to fetch.
     */
    where?: UserMovieDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMovieDates to fetch.
     */
    orderBy?: UserMovieDateOrderByWithRelationInput | UserMovieDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMovieDates.
     */
    cursor?: UserMovieDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMovieDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMovieDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMovieDates.
     */
    distinct?: UserMovieDateScalarFieldEnum | UserMovieDateScalarFieldEnum[]
  }

  /**
   * UserMovieDate findFirstOrThrow
   */
  export type UserMovieDateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter, which UserMovieDate to fetch.
     */
    where?: UserMovieDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMovieDates to fetch.
     */
    orderBy?: UserMovieDateOrderByWithRelationInput | UserMovieDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMovieDates.
     */
    cursor?: UserMovieDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMovieDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMovieDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMovieDates.
     */
    distinct?: UserMovieDateScalarFieldEnum | UserMovieDateScalarFieldEnum[]
  }

  /**
   * UserMovieDate findMany
   */
  export type UserMovieDateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter, which UserMovieDates to fetch.
     */
    where?: UserMovieDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMovieDates to fetch.
     */
    orderBy?: UserMovieDateOrderByWithRelationInput | UserMovieDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserMovieDates.
     */
    cursor?: UserMovieDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMovieDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMovieDates.
     */
    skip?: number
    distinct?: UserMovieDateScalarFieldEnum | UserMovieDateScalarFieldEnum[]
  }

  /**
   * UserMovieDate create
   */
  export type UserMovieDateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * The data needed to create a UserMovieDate.
     */
    data: XOR<UserMovieDateCreateInput, UserMovieDateUncheckedCreateInput>
  }

  /**
   * UserMovieDate createMany
   */
  export type UserMovieDateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserMovieDates.
     */
    data: UserMovieDateCreateManyInput | UserMovieDateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserMovieDate createManyAndReturn
   */
  export type UserMovieDateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * The data used to create many UserMovieDates.
     */
    data: UserMovieDateCreateManyInput | UserMovieDateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserMovieDate update
   */
  export type UserMovieDateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * The data needed to update a UserMovieDate.
     */
    data: XOR<UserMovieDateUpdateInput, UserMovieDateUncheckedUpdateInput>
    /**
     * Choose, which UserMovieDate to update.
     */
    where: UserMovieDateWhereUniqueInput
  }

  /**
   * UserMovieDate updateMany
   */
  export type UserMovieDateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserMovieDates.
     */
    data: XOR<UserMovieDateUpdateManyMutationInput, UserMovieDateUncheckedUpdateManyInput>
    /**
     * Filter which UserMovieDates to update
     */
    where?: UserMovieDateWhereInput
    /**
     * Limit how many UserMovieDates to update.
     */
    limit?: number
  }

  /**
   * UserMovieDate updateManyAndReturn
   */
  export type UserMovieDateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * The data used to update UserMovieDates.
     */
    data: XOR<UserMovieDateUpdateManyMutationInput, UserMovieDateUncheckedUpdateManyInput>
    /**
     * Filter which UserMovieDates to update
     */
    where?: UserMovieDateWhereInput
    /**
     * Limit how many UserMovieDates to update.
     */
    limit?: number
  }

  /**
   * UserMovieDate upsert
   */
  export type UserMovieDateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * The filter to search for the UserMovieDate to update in case it exists.
     */
    where: UserMovieDateWhereUniqueInput
    /**
     * In case the UserMovieDate found by the `where` argument doesn't exist, create a new UserMovieDate with this data.
     */
    create: XOR<UserMovieDateCreateInput, UserMovieDateUncheckedCreateInput>
    /**
     * In case the UserMovieDate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserMovieDateUpdateInput, UserMovieDateUncheckedUpdateInput>
  }

  /**
   * UserMovieDate delete
   */
  export type UserMovieDateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
    /**
     * Filter which UserMovieDate to delete.
     */
    where: UserMovieDateWhereUniqueInput
  }

  /**
   * UserMovieDate deleteMany
   */
  export type UserMovieDateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMovieDates to delete
     */
    where?: UserMovieDateWhereInput
    /**
     * Limit how many UserMovieDates to delete.
     */
    limit?: number
  }

  /**
   * UserMovieDate without action
   */
  export type UserMovieDateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMovieDate
     */
    select?: UserMovieDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMovieDate
     */
    omit?: UserMovieDateOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserMovieDateScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tmdbId: 'tmdbId',
    status: 'status',
    rating: 'rating',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserMovieDateScalarFieldEnum = (typeof UserMovieDateScalarFieldEnum)[keyof typeof UserMovieDateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'MovieStatus'
   */
  export type EnumMovieStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovieStatus'>
    


  /**
   * Reference to a field of type 'MovieStatus[]'
   */
  export type ListEnumMovieStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovieStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserMovieDateWhereInput = {
    AND?: UserMovieDateWhereInput | UserMovieDateWhereInput[]
    OR?: UserMovieDateWhereInput[]
    NOT?: UserMovieDateWhereInput | UserMovieDateWhereInput[]
    id?: StringFilter<"UserMovieDate"> | string
    userId?: StringFilter<"UserMovieDate"> | string
    tmdbId?: IntFilter<"UserMovieDate"> | number
    status?: EnumMovieStatusFilter<"UserMovieDate"> | $Enums.MovieStatus
    rating?: IntNullableFilter<"UserMovieDate"> | number | null
    createdAt?: DateTimeFilter<"UserMovieDate"> | Date | string
    updatedAt?: DateTimeFilter<"UserMovieDate"> | Date | string
  }

  export type UserMovieDateOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tmdbId?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMovieDateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserMovieDateWhereInput | UserMovieDateWhereInput[]
    OR?: UserMovieDateWhereInput[]
    NOT?: UserMovieDateWhereInput | UserMovieDateWhereInput[]
    userId?: StringFilter<"UserMovieDate"> | string
    tmdbId?: IntFilter<"UserMovieDate"> | number
    status?: EnumMovieStatusFilter<"UserMovieDate"> | $Enums.MovieStatus
    rating?: IntNullableFilter<"UserMovieDate"> | number | null
    createdAt?: DateTimeFilter<"UserMovieDate"> | Date | string
    updatedAt?: DateTimeFilter<"UserMovieDate"> | Date | string
  }, "id">

  export type UserMovieDateOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tmdbId?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserMovieDateCountOrderByAggregateInput
    _avg?: UserMovieDateAvgOrderByAggregateInput
    _max?: UserMovieDateMaxOrderByAggregateInput
    _min?: UserMovieDateMinOrderByAggregateInput
    _sum?: UserMovieDateSumOrderByAggregateInput
  }

  export type UserMovieDateScalarWhereWithAggregatesInput = {
    AND?: UserMovieDateScalarWhereWithAggregatesInput | UserMovieDateScalarWhereWithAggregatesInput[]
    OR?: UserMovieDateScalarWhereWithAggregatesInput[]
    NOT?: UserMovieDateScalarWhereWithAggregatesInput | UserMovieDateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserMovieDate"> | string
    userId?: StringWithAggregatesFilter<"UserMovieDate"> | string
    tmdbId?: IntWithAggregatesFilter<"UserMovieDate"> | number
    status?: EnumMovieStatusWithAggregatesFilter<"UserMovieDate"> | $Enums.MovieStatus
    rating?: IntNullableWithAggregatesFilter<"UserMovieDate"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"UserMovieDate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserMovieDate"> | Date | string
  }

  export type UserMovieDateCreateInput = {
    id?: string
    userId: string
    tmdbId: number
    status: $Enums.MovieStatus
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserMovieDateUncheckedCreateInput = {
    id?: string
    userId: string
    tmdbId: number
    status: $Enums.MovieStatus
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserMovieDateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tmdbId?: IntFieldUpdateOperationsInput | number
    status?: EnumMovieStatusFieldUpdateOperationsInput | $Enums.MovieStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMovieDateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tmdbId?: IntFieldUpdateOperationsInput | number
    status?: EnumMovieStatusFieldUpdateOperationsInput | $Enums.MovieStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMovieDateCreateManyInput = {
    id?: string
    userId: string
    tmdbId: number
    status: $Enums.MovieStatus
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserMovieDateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tmdbId?: IntFieldUpdateOperationsInput | number
    status?: EnumMovieStatusFieldUpdateOperationsInput | $Enums.MovieStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMovieDateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tmdbId?: IntFieldUpdateOperationsInput | number
    status?: EnumMovieStatusFieldUpdateOperationsInput | $Enums.MovieStatus
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumMovieStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | EnumMovieStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMovieStatusFilter<$PrismaModel> | $Enums.MovieStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserMovieDateCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tmdbId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMovieDateAvgOrderByAggregateInput = {
    tmdbId?: SortOrder
    rating?: SortOrder
  }

  export type UserMovieDateMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tmdbId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMovieDateMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tmdbId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMovieDateSumOrderByAggregateInput = {
    tmdbId?: SortOrder
    rating?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumMovieStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | EnumMovieStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel> | $Enums.MovieStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovieStatusFilter<$PrismaModel>
    _max?: NestedEnumMovieStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumMovieStatusFieldUpdateOperationsInput = {
    set?: $Enums.MovieStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumMovieStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | EnumMovieStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMovieStatusFilter<$PrismaModel> | $Enums.MovieStatus
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | EnumMovieStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovieStatus[] | ListEnumMovieStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel> | $Enums.MovieStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovieStatusFilter<$PrismaModel>
    _max?: NestedEnumMovieStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}