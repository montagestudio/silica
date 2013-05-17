/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    ProjectFactory = require("core/project").ProjectFactory,
    DocumentController = require("core/document-controller").DocumentController;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Montage.create(Component, /** @lends module:"ui/main.reel".Main# */ {

    didCreate: {
        value: function () {
            var self = this;

            this.documentController = DocumentController.create();
            this.defineBinding("documentController.projects", {"<-": "projects"});

            //TODO use a service to find the list of projects
            ProjectFactory.defaultProject("Untitled Project").then(function (project) {
                self.projects = [project];
            }).done();
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addPathChangeListener("documentController.currentDocument", this, "openedDocument");
                this.templateObjects.workbench.addEventListener("select", this, false);
            }
        }
    },

    projects: {
        value: null
    },

    documentController: {
        value: null
    },

    handleOpenButtonAction: {
        value: function (evt) {
            var project = evt.detail.get("project");

            this.documentController.openUrl(project.url).done();
        }
    },

    openedDocument: {
        value: function (doc) {

            var template,
                workbench = this.templateObjects.workbench;

            if (doc) {
                template = doc.getPath("project.template");
            }

            //TODO clear out the template we were showing even if we now show no template
            if (template) {
                workbench.loadTemplate(template).done();
            }
        }
    },

    handleSelect: {
        value: function (evt) {
            var detail = evt.detail,
                selectionCandidate = detail.candidate,
                editingDocument = this.documentController.currentDocument,
                selectedObjects;

            if (editingDocument && selectionCandidate && selectionCandidate.component) {
                selectionCandidate = editingDocument.editingProxyForObject(selectionCandidate.component);
                selectedObjects = editingDocument.selectedObjects;
                selectedObjects.splice(0, selectedObjects.length, selectionCandidate);
            } else {
                editingDocument.clearSelectedObjects();
            }
        }
    }

});