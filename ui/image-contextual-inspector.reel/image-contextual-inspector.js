/**
    @module "ui/image-contextual-inspector.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

/**
    Description TODO
    @class module:"ui/image-contextual-inspector.reel".ImageContextualInspector
    @extends module:montage/ui/component.Component
*/
exports.ImageContextualInspector = Montage.create(Component, /** @lends module:"ui/image-contextual-inspector.reel".ImageContextualInspector# */ {

    constructor: {
        value: function ImageContextualInspector () {
            this.super();

            this.addPathChangeListener("inspectedObject", this, "reset");
        }
    },

    inspectedObject: {
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

    handleTranslateStart: {
        value: function () {
            this.templateObjects.rotationComposer.translateX = this.x;
            this.templateObjects.rotationComposer.translateY = this.y;
        }
    },

    handleTranslateEnd: {
        value: function () {

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

                if (null === this.originX) {
                    this.originX = this.width/2;
                }

                if (null === this.originY) {
                    this.originY = this.height/2;
                }

                if (null === this.x) {
                    //TODO determine coordinates of rotation handle given current rotation
                    console.log("should indicate rotation", this.inspectedObject.properties.get('rotation'));
                    this.x = this.originX;
                }

                if (null === this.y) {
                    this.y = 0;
                }

            }
        }
    },

    draw: {
        value: function () {
            var style = this.element.style;
            style.width = (this.width ? this.width : 0) + "px";
            style.height = (this.height ? this.height : 0) + "px";
            style.webkitTransform = "translate3d(" + this.offsetLeft + "px," + this.offsetTop + "px, 0)";

            var templateObjects = this.templateObjects;
            templateObjects.originHandle.element.style.webkitTransform = "translate3d(" + this.originX + "px," + this.originY + "px, 0)";

            templateObjects.rotationHandle.element.style.webkitTransform = "translate3d(" + this.x + "px," + this.y + "px, 0)";
        }
    }

});
