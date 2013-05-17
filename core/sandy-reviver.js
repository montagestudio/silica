var Montage = require("montage").Montage,
    ProxyReviver = require("palette/core/serialization/proxy-reviver").ProxyReviver,
    EditingProxy = require("palette/core/editing-proxy").EditingProxy;

exports.SandyReviver = Montage.create(ProxyReviver, {

    reviveMontageObject: {
        value: function(value, context, label) {

            if (context.hasUserObject(label)) {
                return context.getUserObject(label);
            }

            var exportId,
                proxyObject = EditingProxy.create(),
                revivedSerialization;

            context.setObjectLabel(proxyObject, label);
            revivedSerialization = this.reviveObjectLiteral(value, context);

            if ("owner" === label) {
                exportId = context.ownerExportId;
            } else {
                exportId = value.prototype;
            }

            return proxyObject.init(label, revivedSerialization, exportId, context.editingDocument);
        }
    }

});
