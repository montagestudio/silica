var Montage = require("montage").Montage,
    EditingDocument = require("palette/core/editing-document").EditingDocument,
    Promise = require("montage/core/promise").Promise,
    SandyReviver = require("core/sandy-reviver").SandyReviver,
    SandyContext = require("core/sandy-context").SandyContext,
    SORTERS = require("palette/core/sorters"),
    SandyDocument;

exports.SandyDocument = SandyDocument = Montage.create(EditingDocument, {

    load: {
        value: function (url, packageUrl, project) {

            var promisedDocument;

            if (project) {
                var projectRequire = require;
                promisedDocument = Promise.resolve(SandyDocument.create().init(url, projectRequire, project))
            } else {
                promisedDocument = Promise.reject(new Error("Cannot load a document with no project"));
            }

            return promisedDocument;
        }
    },

    init: {
        value: function (fileUrl, packageRequire, project) {
            var self = EditingDocument.init.call(this, fileUrl, packageRequire);
            self._project = project;

            var template = project.template;
            var serialization = JSON.parse(template.getInlineObjectsString(template.document));
            var context = self.deserializationContext(serialization);
            self._addProxies(context.getObjects());

            return self;
        }
    },

    _buildSerializationObjects: {
        value: function () {
            var template = this.project.template,
                templateObjects = {};

            Object.keys(this._editingProxyMap).sort(SORTERS.labelComparator).forEach(function (label) {
                templateObjects[label] = this.serializationForProxy(this._editingProxyMap[label]);
            }, this);

            template.dispatchBeforeOwnPropertyChange("html", template.html);
            template.objectsString = JSON.stringify(templateObjects, null, 4);
            template.dispatchOwnPropertyChange("html", template.html);

            return templateObjects;
        }
    },

    _project: {
        value: null
    },

    project: {
        get: function () {
            return this._project;
        }
    },

    newReviver: {
        get: function() {
            return SandyReviver.create();
        }
    },

    newContext: {
        get: function() {
            return SandyContext.create();
        }
    }

});
