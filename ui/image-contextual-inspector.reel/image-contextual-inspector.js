/**
    @module "ui/image-contextual-inspector.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    Promise = require("montage/core/promise").Promise;

/**
    Description TODO
    @class module:"ui/image-contextual-inspector.reel".ImageContextualInspector
    @extends module:montage/ui/component.Component
*/
exports.ImageContextualInspector = Component.specialize(/** @lends module:"ui/image-contextual-inspector.reel".ImageContextualInspector# */ {

    constructor: {
        value: function ImageContextualInspector () {
            this.super();

            this.addPathChangeListener("inspectedObject", this, "reset");
            this.addPathChangeListener("inspectedObject.properties.get('rotation')", this, "scheduleDraw");
        }
    },

    inspectedObject: {
        value: null
    },

    editingDocument: {
        value: null
    },

    reset: {
        value: function () {
            this.width =
            this.height =
            this.originX =
            this.originY =
            this.x =
            this.y = null;

            this.needsDraw = true;
        }
    },

    scheduleDraw: {
        value: function () {
            this.needsDraw = true;
        }
    },

    _deferredRotationCompletion: {
        value: null
    },

    _startingRotation: {
        value: null
    },

    handleTranslateStart: {
        value: function () {

            if (this._deferredRotationCompletion) {
                return;
            }

            this.templateObjects.rotationComposer.translateX = this.x;
            this.templateObjects.rotationComposer.translateY = this.y;

            this._startingRotation = this.getPath("inspectedObject.properties.get('rotation')");
            this._deferredRotationCompletion = Promise.defer();
            this.editingDocument.undoManager.register("Set Rotation", this._deferredRotationCompletion.promise);
            this.editingDocument.undoManager.registrationEnabled = false;
        }
    },

    handleTranslateEnd: {
        value: function () {
            this.editingDocument.undoManager.registrationEnabled = true;
            var editingDocument = this.inspectedObject.editingDocument;
            this._deferredRotationCompletion.resolve([editingDocument.setOwnedObjectProperty, editingDocument, this.inspectedObject, "rotation", this._startingRotation]);
            this._deferredRotationCompletion = null;
        }
    },

    offsetLeft: {
        value: 0
    },

    offsetTop: {
        value: 0
    },

    width: {
        value: null
    },

    height: {
        value: null
    },

    originX: {
        value: null
    },

    originY: {
        value: null
    },

    x: {
        value: null
    },

    y: {
        value: null
    },

    handleTranslate: {
        value: function (evt) {

            if (!this.inspectedObject) {
                return;
            }

            var x = this.x = evt.translateX;
            var y = this.y = evt.translateY;
            var rotationRadians = Math.atan((x-this.originX)/(this.originY-y));
            var rotationDegrees = rotationRadians * (180/Math.PI);

            if (y > this.originY) {
                if (x < this.originX) {
                    rotationDegrees -= 180;
                } else {
                    rotationDegrees += 180;
                }
            }

            this.inspectedObject.editingDocument.setOwnedObjectProperty(this.inspectedObject, "rotation", rotationDegrees);
            this.needsDraw = true;
        }
    },

    willDraw: {
        value: function () {

            if (!this.inspectedObject) {
                return;
            }

            var stageObject = this.inspectedObject.stageObject,
                element;
            if (stageObject) {
                element = stageObject.element;
                this.offsetTop = element.offsetTop;
                this.offsetLeft = element.offsetLeft;
                this.width = element.offsetWidth;
                this.height = element.offsetHeight;

                this.rotorLength = this.height/2 + 50;

                if (null === this.originX) {
                    this.originX = this.width/2;
                }

                if (null === this.originY) {
                    this.originY = this.height/2;
                }

                if (null === this.x) {
                    this.x = this.originX;
                }

                if (null === this.y) {
                    this.y = this.originY - this.rotorLength;
                }

            }
        }
    },

    rotorLength: {
        value: null
    },

    draw: {
        value: function () {
            var style = this.element.style;
            style.width = (this.width ? this.width : 0) + "px";
            style.height = (this.height ? this.height : 0) + "px";

            var theta = this.getPath("inspectedObject.properties.get('rotation')");
            theta = theta ? theta : 0;
            style.webkitTransform = "translate3d(" + this.offsetLeft + "px," + this.offsetTop + "px, 0) rotate(" + theta + "deg)";

            var templateObjects = this.templateObjects;
            templateObjects.originHandle.element.style.webkitTransform = "translate3d(" + this.originX + "px," + this.originY + "px, 0)";
            templateObjects.rotationHandle.element.style.webkitTransform = "translate3d(" + this.originX + "px," + (this.originY - this.rotorLength) + "px, 0)";
        }
    }

});
