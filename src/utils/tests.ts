export {
  assertReject
};

const assertReject = (promise: Promise<any>, errorText: string): Promise<any> => {
  return promise
    .then(() => {
      throw new Error('Action successfully finished.')
    })
    .catch((err) => expect(err.message).toEqual(errorText))
}
