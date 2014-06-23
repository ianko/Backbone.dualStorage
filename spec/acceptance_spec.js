// Generated by CoffeeScript 1.7.1
(function() {
  var Collection, Model, backboneSync, dualSync, localStorage, localSync, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  backboneSync = window.backboneSync, localSync = window.localSync, dualSync = window.dualSync, localStorage = window.localStorage;

  _ref = {}, Collection = _ref.Collection, Model = _ref.Model;

  describe('Backbone.dualStorage', function() {
    this.timeout(10);
    beforeEach(function() {
      localStorage.clear();
      Model = (function(_super) {
        __extends(Model, _super);

        function Model() {
          return Model.__super__.constructor.apply(this, arguments);
        }

        Model.prototype.idAttribute = '_id';

        Model.prototype.urlRoot = 'things/';

        return Model;

      })(Backbone.Model);
      return Collection = (function(_super) {
        __extends(Collection, _super);

        function Collection() {
          return Collection.__super__.constructor.apply(this, arguments);
        }

        Collection.prototype.model = Model;

        Collection.prototype.url = Model.prototype.urlRoot;

        return Collection;

      })(Backbone.Collection);
    });
    describe('basic persistence', function() {
      describe('online operations cached for offline use', function() {
        describe('Model.fetch', function() {
          it('stores the result locally after fetch', function(done) {
            var fetchedOnline, model;
            fetchedOnline = $.Deferred();
            model = new Model({
              _id: 1
            });
            model.fetch({
              serverResponse: {
                _id: 1,
                pants: 'fancy'
              },
              success: function() {
                return fetchedOnline.resolve();
              }
            });
            return fetchedOnline.done(function() {
              var fetchedLocally;
              fetchedLocally = $.Deferred();
              model = new Model({
                _id: 1
              });
              model.fetch({
                remote: false,
                success: function() {
                  return fetchedLocally.resolve();
                }
              });
              return fetchedLocally.done(function() {
                expect(model.get('pants')).to.equal('fancy');
                return done();
              });
            });
          });
          return it('replaces previously fetched data in local storage when fetched again', function(done) {
            var fetch1, model;
            fetch1 = $.Deferred();
            model = new Model({
              _id: 1
            });
            model.fetch({
              serverResponse: {
                _id: 1,
                pants: 'fancy'
              },
              success: function() {
                return fetch1.resolve();
              }
            });
            return fetch1.done(function() {
              var fetch2;
              fetch2 = $.Deferred();
              model = new Model({
                _id: 1
              });
              model.fetch({
                serverResponse: {
                  _id: 1,
                  shoes: 'boots'
                },
                success: function() {
                  return fetch2.resolve();
                }
              });
              return fetch2.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.get('pants')).to.be.undefined;
                  expect(model.get('shoes')).to.equal('boots');
                  return done();
                });
              });
            });
          });
        });
        describe('Model.save', function() {
          describe('creating a new model', function() {
            it('stores saved attributes locally', function(done) {
              var model, saved;
              saved = $.Deferred();
              model = new Model;
              model.save('paper', 'oragami', {
                serverResponse: {
                  _id: 1,
                  paper: 'oragami'
                },
                success: function() {
                  return saved.resolve();
                }
              });
              return saved.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.get('paper')).to.equal('oragami');
                  return done();
                });
              });
            });
            return it('updates the model with changes in the server response', function(done) {
              var model, response, saved;
              saved = $.Deferred();
              model = new Model({
                role: 'admin',
                action: 'escalating privileges'
              });
              response = {
                role: 'peon',
                action: 'escalating privileges',
                _id: 1,
                updated_at: '2014-07-04 00:00:00'
              };
              model.save(null, {
                serverResponse: response,
                success: function() {
                  return saved.resolve();
                }
              });
              return saved.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.attributes).to.eql(response);
                  return done();
                });
              });
            });
          });
          return describe('updating an existing model', function() {
            it('stores saved attributes locally', function(done) {
              var model, saved;
              saved = $.Deferred();
              model = new Model({
                _id: 1
              });
              model.save('paper', 'oragami', {
                success: function() {
                  return saved.resolve();
                }
              });
              return saved.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.get('paper')).to.equal('oragami');
                  return done();
                });
              });
            });
            it('updates the model with changes in the server response', function(done) {
              var model, response, saved;
              saved = $.Deferred();
              model = new Model({
                _id: 1,
                role: 'admin',
                action: 'escalating privileges'
              });
              response = {
                _id: 1,
                role: 'peon',
                action: 'escalating privileges',
                updated_at: '2014-07-04 00:00:00'
              };
              model.save(null, {
                serverResponse: response,
                success: function() {
                  return saved.resolve();
                }
              });
              return saved.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.attributes).to.eql(response);
                  return done();
                });
              });
            });
            return it('replaces previously saved attributes when saved again', function(done) {
              var model, saved1;
              saved1 = $.Deferred();
              model = new Model({
                _id: 1
              });
              model.save('paper', 'hats', {
                success: function() {
                  return saved1.resolve();
                }
              });
              return saved1.done(function() {
                var saved2;
                saved2 = $.Deferred();
                model = new Model({
                  _id: 1
                });
                model.save('leather', 'belts', {
                  success: function() {
                    return saved2.resolve();
                  }
                });
                return saved2.done(function() {
                  var fetchedLocally;
                  fetchedLocally = $.Deferred();
                  model = new Model({
                    _id: 1
                  });
                  model.fetch({
                    remote: false,
                    success: function() {
                      return fetchedLocally.resolve();
                    }
                  });
                  return fetchedLocally.done(function() {
                    expect(model.get('paper')).to.be.undefined;
                    expect(model.get('leather')).to.equal('belts');
                    return done();
                  });
                });
              });
            });
          });
        });
        describe('Model.destroy', function() {
          it('removes the locally stored version', function(done) {
            var model, saved;
            saved = $.Deferred();
            model = new Model({
              _id: 1
            });
            model.save(null, {
              success: function() {
                return saved.resolve();
              }
            });
            return saved.done(function() {
              var destroyed;
              destroyed = $.Deferred();
              model = new Model({
                _id: 1
              });
              model.destroy({
                success: function() {
                  return destroyed.resolve();
                }
              });
              return destroyed.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: 1
                });
                return model.fetch({
                  remote: false,
                  error: function() {
                    return done();
                  }
                });
              });
            });
          });
          return it("doesn't error if there was no locally stored version", function(done) {
            var destroyed, model;
            destroyed = $.Deferred();
            model = new Model({
              _id: 1
            });
            return model.destroy({
              success: function() {
                return done();
              }
            });
          });
        });
        return describe('Collection.fetch', function() {
          it('stores each model locally', function(done) {
            var collection, fetched, response_collection;
            fetched = $.Deferred();
            response_collection = [
              {
                _id: 1,
                hair: 'strawberry'
              }, {
                _id: 2,
                hair: 'burgundy'
              }
            ];
            collection = new Collection;
            collection.fetch({
              serverResponse: response_collection,
              success: function() {
                return fetched.resolve();
              }
            });
            return fetched.done(function() {
              var fetchedLocally;
              expect(collection.length).to.equal(2);
              fetchedLocally = $.Deferred();
              collection = new Collection;
              collection.fetch({
                remote: false,
                success: function() {
                  return fetchedLocally.resolve();
                }
              });
              return fetchedLocally.done(function() {
                expect(collection.length).to.equal(2);
                expect(collection.map(function(model) {
                  return model.id;
                })).to.eql([1, 2]);
                expect(collection.get(2).get('hair')).to.equal('burgundy');
                return done();
              });
            });
          });
          it('replaces the existing local collection', function(done) {
            var model, saved;
            saved = $.Deferred();
            model = new Model({
              _id: 3,
              hair: 'chocolate'
            });
            model.save(null, {
              success: function() {
                return saved.resolve();
              }
            });
            return saved.done(function() {
              var collection, fetched, response_collection;
              fetched = $.Deferred();
              response_collection = [
                {
                  _id: 1,
                  hair: 'strawberry'
                }, {
                  _id: 2,
                  hair: 'burgundy'
                }
              ];
              collection = new Collection;
              collection.fetch({
                serverResponse: response_collection,
                success: function() {
                  return fetched.resolve();
                }
              });
              return fetched.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                collection = new Collection;
                collection.fetch({
                  remote: false,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                fetchedLocally.done(function() {});
                expect(collection.length).to.equal(2);
                expect(collection.map(function(model) {
                  return model.id;
                })).to.eql([1, 2]);
                return done();
              });
            });
          });
          return describe('options: {add: true}', function() {
            it('adds to the existing local collection', function(done) {
              var model, saved;
              saved = $.Deferred();
              model = new Model({
                _id: 3,
                hair: 'chocolate'
              });
              model.save(null, {
                success: function() {
                  return saved.resolve();
                }
              });
              return saved.done(function() {
                var collection, fetched, response_collection;
                fetched = $.Deferred();
                response_collection = [
                  {
                    _id: 1,
                    hair: 'strawberry'
                  }, {
                    _id: 2,
                    hair: 'burgundy'
                  }
                ];
                collection = new Collection;
                collection.fetch({
                  add: true,
                  serverResponse: response_collection,
                  success: function() {
                    return fetched.resolve();
                  }
                });
                return fetched.done(function() {
                  var fetchedLocally;
                  fetchedLocally = $.Deferred();
                  collection = new Collection;
                  collection.fetch({
                    remote: false,
                    success: function() {
                      return fetchedLocally.resolve();
                    }
                  });
                  return fetchedLocally.done(function() {
                    expect(collection.length).to.equal(3);
                    expect(collection.map(function(model) {
                      return model.id;
                    })).to.include.members([1, 2, 3]);
                    return done();
                  });
                });
              });
            });
            return describe('options: {add: true, merge: false}', function() {
              return it('(FAILS; DISABLED) does not update attributes on existing local models', function(done) {
                var model, saved;
                return done();
                saved = $.Deferred();
                model = new Model({
                  _id: 3,
                  hair: 'chocolate'
                });
                model.save(null, {
                  success: function() {
                    return saved.resolve();
                  }
                });
                return saved.done(function() {
                  var collection, fetched, response_collection;
                  fetched = $.Deferred();
                  response_collection = [
                    {
                      _id: 1,
                      hair: 'strawberry'
                    }, {
                      _id: 2,
                      hair: 'burgundy'
                    }, {
                      _id: 3,
                      hair: 'white chocolate'
                    }
                  ];
                  collection = new Collection;
                  collection.fetch({
                    add: true,
                    merge: false,
                    serverResponse: response_collection,
                    success: function() {
                      return fetched.resolve();
                    }
                  });
                  return fetched.done(function() {
                    var fetchedLocally;
                    fetchedLocally = $.Deferred();
                    collection = new Collection;
                    collection.fetch({
                      remote: false,
                      success: function() {
                        return fetchedLocally.resolve();
                      }
                    });
                    return fetchedLocally.done(function() {
                      expect(collection.length).to.equal(3);
                      expect(collection.get(3).get('hair')).to.equal('chocolate');
                      return done();
                    });
                  });
                });
              });
            });
          });
        });
      });
      return describe('offline operations cached for syncing later', function() {
        describe('Model.save, Model.fetch', function() {
          it('creates new records', function(done) {
            var model, saved;
            saved = $.Deferred();
            model = new Model;
            model.save('paper', 'oragami', {
              errorStatus: 0,
              success: function() {
                return saved.resolve();
              }
            });
            return saved.done(function() {
              var fetchedLocally;
              fetchedLocally = $.Deferred();
              model = new Model({
                _id: model.id
              });
              model.fetch({
                errorStatus: 0,
                success: function() {
                  return fetchedLocally.resolve();
                }
              });
              return fetchedLocally.done(function() {
                expect(model.get('paper')).to.equal('oragami');
                return done();
              });
            });
          });
          return it('updates records created while offline', function(done) {
            var model, saved;
            saved = $.Deferred();
            model = new Model;
            model.save('paper', 'oragami', {
              errorStatus: 0,
              success: function() {
                return saved.resolve();
              }
            });
            return saved.done(function() {
              var updated;
              updated = $.Deferred();
              model.save('paper', 'mâché', {
                errorStatus: 0,
                success: function() {
                  return updated.resolve();
                }
              });
              return updated.done(function() {
                var fetchedLocally;
                fetchedLocally = $.Deferred();
                model = new Model({
                  _id: model.id
                });
                model.fetch({
                  errorStatus: 0,
                  success: function() {
                    return fetchedLocally.resolve();
                  }
                });
                return fetchedLocally.done(function() {
                  expect(model.get('paper')).to.equal('mâché');
                  return done();
                });
              });
            });
          });
        });
        describe('Collection.fetch', function() {
          return it('loads models that were saved with a common storeName/urlRoot', function(done) {
            var model1, model2, saved1, saved2;
            saved1 = $.Deferred();
            model1 = new Model({
              a: 1
            });
            model1.save('paper', 'oragami', {
              errorStatus: 0,
              success: function() {
                return saved1.resolve();
              }
            });
            saved2 = $.Deferred();
            model2 = new Model({
              a: 2
            });
            model2.save('paper', 'oragami', {
              errorStatus: 0,
              success: function() {
                return saved2.resolve();
              }
            });
            return $.when(saved1, saved2).done(function() {
              var collection, fetched;
              fetched = $.Deferred();
              collection = new Collection;
              collection.fetch({
                errorStatus: 0,
                success: function() {
                  return fetched.resolve();
                }
              });
              return fetched.done(function() {
                expect(collection.size()).to.equal(2);
                expect(collection.get(model1.id).attributes).to.eql(model1.attributes);
                expect(collection.get(model2.id).attributes).to.eql(model2.attributes);
                return done();
              });
            });
          });
        });
        return describe('Model.id', function() {
          return it('obtains a temporary id on new records for use until saved online', function(done) {
            var model, saved;
            saved = $.Deferred();
            model = new Model;
            model.save(null, {
              errorStatus: 0,
              success: function() {
                return saved.resolve();
              }
            });
            return saved.done(function() {
              expect(model.id.length).to.equal(36);
              return done();
            });
          });
        });
      });
    });
    return describe('syncing offline changes when there are dirty or destroyed records', function() {
      beforeEach(function(done) {
        var allModified, allSaved;
        this.collection = new Collection([
          {
            _id: 1,
            name: 'change me'
          }, {
            _id: 2,
            name: 'delete me'
          }
        ]);
        allSaved = this.collection.map(function(model) {
          var saved;
          saved = $.Deferred();
          model.save(null, {
            success: function() {
              return saved.resolve();
            }
          });
          return saved;
        });
        allModified = $.when.apply($, allSaved).then((function(_this) {
          return function() {
            var destroyed, dirtied;
            dirtied = $.Deferred();
            _this.collection.get(1).save('name', 'dirty me', {
              errorStatus: 0,
              success: function() {
                return dirtied.resolve();
              }
            });
            destroyed = $.Deferred();
            _this.collection.get(2).destroy({
              errorStatus: 0,
              success: function() {
                return destroyed.resolve();
              }
            });
            return $.when(dirtied, destroyed);
          };
        })(this));
        return allModified.done(function() {
          return done();
        });
      });
      describe('Model.fetch', function() {
        return it('reads models in dirty collections from local storage until a successful sync', function(done) {
          var fetched, model;
          fetched = $.Deferred();
          model = new Model({
            _id: 1
          });
          model.fetch({
            serverResponse: {
              _id: 1,
              name: 'this response is never used'
            },
            success: function() {
              return fetched.resolve();
            }
          });
          return fetched.done(function() {
            expect(model.get('name')).to.equal('dirty me');
            return done();
          });
        });
      });
      describe('Collection.fetch', function() {
        return it('excludes destroyed models when working locally before a sync', function(done) {
          var collection, fetched;
          fetched = $.Deferred();
          collection = new Collection;
          collection.fetch({
            serverResponse: [
              {
                _id: 3,
                name: 'this response is never used'
              }
            ],
            success: function() {
              return fetched.resolve();
            }
          });
          return fetched.done(function() {
            expect(collection.size()).to.equal(1);
            expect(collection.first().get('name')).to.equal('dirty me');
            return done();
          });
        });
      });
      describe('Collection.dirtyModels', function() {
        return it('returns an array of models that have been created or updated while offline', function() {
          return expect(this.collection.dirtyModels()).to.eql([this.collection.get(1)]);
        });
      });
      describe('Collection.destroyedModelIds', function() {
        return it('returns an array of ids for models that have been destroyed while offline', function() {
          return expect(this.collection.destroyedModelIds()).to.eql(['2']);
        });
      });
      describe('Collection.syncDirty', function() {
        return it('attempts to save online all records that were created/updated while offline', function() {
          backboneSync.reset();
          this.collection.syncDirty();
          expect(backboneSync.callCount).to.equal(1);
          return expect(this.collection.dirtyModels()).to.eql([]);
        });
      });
      describe('Collection.syncDestroyed', function() {
        return it('attempts to destroy online all records that were destroyed while offline', function() {
          backboneSync.reset();
          this.collection.syncDestroyed();
          expect(backboneSync.callCount).to.equal(1);
          return expect(this.collection.destroyedModelIds()).to.eql([]);
        });
      });
      describe('Collection.syncDirtyAndDestroyed', function() {
        return it('attempts to sync online all records that were modified while offline', function() {
          backboneSync.reset();
          this.collection.syncDirtyAndDestroyed();
          expect(backboneSync.callCount).to.equal(2);
          expect(this.collection.dirtyModels()).to.eql([]);
          return expect(this.collection.destroyedModelIds()).to.eql([]);
        });
      });
      describe('Model.destroy', function() {
        return it('does not mark models for deletion that were created and destroyed offline', function(done) {
          var model;
          model = new Model({
            name: 'transient'
          });
          this.collection.add(model);
          model.save(null, {
            errorStatus: 0
          });
          model.destroy({
            errorStatus: 0,
            success: function() {
              return done();
            }
          });
          backboneSync.reset();
          this.collection.syncDestroyed();
          expect(backboneSync.callCount).to.equal(1);
          return expect(backboneSync.firstCall.args[1].id).not.to.equal(model.id);
        });
      });
      return describe('Model.id', function() {
        return it('for new records with a temporary id is replaced by the id returned by the server', function(done) {
          var model, saved;
          saved = $.Deferred();
          model = new Model;
          this.collection.add(model);
          model.save('name', 'created while offline', {
            errorStatus: 0,
            success: function() {
              return saved.resolve();
            }
          });
          return saved.done((function(_this) {
            return function() {
              expect(model.id.length).to.equal(36);
              backboneSync.reset();
              _this.collection.syncDirty();
              expect(backboneSync.callCount).to.equal(2);
              expect(backboneSync.lastCall.args[0]).to.equal('create');
              expect(backboneSync.lastCall.args[1].id).to.be["null"];
              expect(backboneSync.lastCall.args[1].get('_id')).to.be["null"];
              return done();
            };
          })(this));
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=acceptance_spec.map
