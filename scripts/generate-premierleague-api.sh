#!/bin/bash

server='https://pokeapi.co/docs/v2#pokemon'
tags='default'

curl ${server}/documentation?tags=${tags} | jq -r '. + {"securityDefinitions": {"jwt": {"type": "apiKey", "name": "Authorization", "in": "header"}}, "security": [{"jwt": []}]}' > ./scripts/premierleague.json

sed -i -e 's/"format": "date"/"format": "date-time"/g' ./scripts/premierleague.json
echo "bla"
echo ${PWD}
echo "ble"
docker run --rm -v ${PWD}:/local --network="host" -u `id -u $USER` openapitools/openapi-generator-cli:v5.1.0 generate \
  -i /local/scripts/premierleague.json \
  -g typescript-node \
  -o /local/src/controllers/api-clients/track-sl \
  --additional-properties=typescriptThreePlus=true \
  --config /local/scripts/generate-client/config.json | grep -E '^|^.*models\/Model.*ts'