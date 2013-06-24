/**
 @module "ui/configurator.reel"
 @requires montage
 @requires montage/ui/component
 */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    ProjectFactory = require("core/project").ProjectFactory,
    DocumentController = require("core/document-controller").DocumentController;

/**
 Description TODO
 @class module:"ui/configurator.reel".Main
 @extends module:ui/component.Component
 */
exports.Configurator = Component.specialize(/** @lends module:"ui/configurator.reel".Main# */ {

    constructor: {
        value: function Configurator() {
            this.super();
        }
    },

    inspectedObject: {
        value: null
    },

    editingDocument: {
        value: null
    },

    handleUndoButtonAction: {
        value: function () {
            this.editingDocument.undoManager.undo().done();
        }
    },

    handleRedoButtonAction: {
        value: function () {
            this.editingDocument.undoManager.redo().done();
        }
    }
});
