import _ from 'lodash';

module.exports = function (originalHeaders, headersToKeep) {

  const normalizeHeader = function (header) {
    return header.trim().toLowerCase();
  };

  // Normalize list of headers we want to allow in upstream request
  const headersToKeepNormalized = headersToKeep.map(normalizeHeader);

  // Normalize original headers in request
  const originalHeadersNormalized = _.mapKeys(originalHeaders, function (headerValue, headerName) {
    return normalizeHeader(headerName);
  });

  return _.pick(originalHeaders, headersToKeepNormalized);
};
