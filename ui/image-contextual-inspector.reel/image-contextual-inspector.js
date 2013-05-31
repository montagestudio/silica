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

    inspectedObject: {
        value: null
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

    width: {
        value: 256
    },

    height: {
        value: 256
    },

    originX: {
        value: 128
    },

    originY: {
        value: 128
    },

    x: {
        value: 128
    },

    y: {
        value: 0
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

    draw: {
        value: function () {
            this.element.style.width = this.width + "px";
            this.element.style.height = this.height + "px";
            this.templateObjects.originHandle.element.style.webkitTransform = "translate3d(" + this.originX + "px," + this.originY + "px, 0)";

            this.templateObjects.rotationHandle.element.style.webkitTransform = "translate3d(" + this.x + "px," + this.y + "px, 0)";
        }
    }

});
