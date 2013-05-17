var Montage = require("montage/core/core").Montage,
    DocumentController = require("palette/core/document-controller").DocumentController,
    SandyDocument = require("core/sandy-document").SandyDocument;

exports.DocumentController = Montage.create(DocumentController, {

    projects: {
        value: null
    },

    packageUrl: {
        value: null
    },

    documentTypeForUrl: {
        value: function (url) {
            return SandyDocument;
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
