// https://github.com/vercel/storage/issues/606
// https://github.com/vercel/storage/pull/607

exports.trace = {
  getTracer() {
    return null;
  },
};
