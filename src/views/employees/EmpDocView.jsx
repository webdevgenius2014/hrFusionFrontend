import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const EmpDocView = () => {
  const docs = [
    {
      uri:'public/dashboard/pc_desktop.png',
    }, // Remote file
    // { uri: require("./example-files/pdf.pdf") }, // Local File
  ];
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document) => {
    setActiveDocument(document);
  };

  return (
    <>
    
         <DocViewer sandbox="allow-scripts"
        documents={docs}
        activeDocument={activeDocument}
        onDocumentChange={handleDocumentChange}
      />     
    </>
  );
};

export default EmpDocView;
