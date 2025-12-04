export interface IDatabaseClient {
  email: {
    create(data: any): Promise<any>;
    findMany(args?: any): Promise<any>;
    findFirstOrThrow(args: any): Promise<any>;
    update(args: any): Promise<any>;
    count(args?: any): Promise<number>;
    groupBy(args: any): Promise<any>;
  };
}
