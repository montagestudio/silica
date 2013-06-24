var Montage = require("montage").Montage,
    ProxyReviver = require("palette/core/serialization/proxy-reviver").ProxyReviver,
    SilicaProxy = require("core/silica-proxy").SilicaProxy;

exports.SilicaReviver = ProxyReviver.specialize({

    constructor: {
        value: function SilicaReviver() {
            this.super();
        }
    },

    rootObjectLabel: {
        value: "owner"
    },

    proxyConstructor: {
        value: SilicaProxy
    }

});
