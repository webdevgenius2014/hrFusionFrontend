import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const EmpDocView = (props) => {
  const docs = [
    {
      uri: `www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`,
    }, // Remote file
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document) => {
    setActiveDocument(document);
  };

  return (
    <>
    
    <DocViewer
    pluginRenderers={DocViewerRenderers}
    documents={docs}
    config={{
      header: {
        disableHeader: false,
        disableFileName: false,
        retainURLParams: false
      }
    }}
    style={{ height: 500 }}
  />
           
    </>
  );
};

export default EmpDocView;
