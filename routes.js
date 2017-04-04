/** 
 * Copyright (c) 2017 Callan Peter Milne
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above 
 * copyright notice and this permission notice axppear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
'use strict';

const db = require('./src/authorizations');

module.exports = function (app) {

  let routes = [];

  addRoute(app.get('/', (req, res) => {
    res.send(JSON.stringify({
      service: 'eviratec-authz-svc',
      routes: [{
        '/byId/:authorization_id': {},
        '/byGranterId/:granter_id': {},
        '/byGranteeId/:grantee_id': {},
      }]
    }, undefined, '  '));
  }));

  addRoute(app.get('/byId/:authorization_id', (req, res) => {

    db.fetchOneById(req.params.authorization_id)
      .then((authorization) => {
        return res.send(JSON.stringify(authorization, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  addRoute(app.get('/byGranterId/:granter_id', (req, res) => {

    db.fetchManyByGranterId(req.params.granter_id)
      .then((authorizations) => {
        return res.send(JSON.stringify(authorizations, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  addRoute(app.get('/byGranteeId/:grantee_id', (req, res) => {

    db.fetchManyByGranteeId(req.params.grantee_id)
      .then((authorizations) => {
        return res.send(JSON.stringify(authorizations, undefined, '  '));
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.stack);
      });

  }));

  return routes;

  function addRoute (route) {
    routes.push(route);
  }

};
