export function mapMongoId<T extends { _id: any }>(doc: T): Omit<T, '_id'> & { id: string } {
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest,
  };
}
