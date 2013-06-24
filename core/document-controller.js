var Montage = require("montage/core/core").Montage,
    DocumentController = require("palette/core/document-controller").DocumentController,
    SilicaDocument = require("core/silica-document").SilicaDocument;

exports.DocumentController = DocumentController.specialize({

    constructor: {
        value: function DocumentController() {
            this.super();
        }
    },

    projects: {
        value: null
    },

    packageUrl: {
        value: null
    },

    documentTypeForUrl: {
        value: function (url) {
            return SilicaDocument;
        }
    },

    createDocumentWithTypeAndUrl: {
        value: function (documentType, url) {
            var project = this.projects.filter(function (project) {
                return url === project.url;
            })[0];
            return documentType.load(url, this.packageUrl, project);
        }
    }

});
