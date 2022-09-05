
 function saveDocument(callback) {
    TXTextControl.saveDocument(TXTextControl.StreamType.HTMLFormat,
        function (e) {
            bara = e.data
            console.log(bara)
            let doc = new DOMParser().parseFromString(bara, 'text/html'),
            text = doc.body;
            xmlText = new XMLSerializer().serializeToString(text);
            console.log(xmlText)
            callback(xmlText)
        });
}

function loadDocument(vara) {
    TXTextControl.loadDocument(TXTextControl.StreamType.HTMLFormat,
        btoa(vara));
}