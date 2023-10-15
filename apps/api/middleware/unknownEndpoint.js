const unknownEndpoint = (request, response) => {
  response.status(404).send("Unknown Endpoint");
};

module.exports = unknownEndpoint;
