import { useEffect, useState } from "react";

/*
use:
export default function App() {
  const [document_title, setDoucmentTitle] = useDocumentTitle("Home page");
return (
    <div className="App">
      <h1>Hello React App</h1>
      <button onClick={() => setDoucmentTitle("About page")}>  
       Change document title     
       </button>   
     </div>
  );
}
*/
const useDocumentTitle = (title: string) => {
  const [document_title, setDoucmentTitle] = useState(title);
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return [document_title, setDoucmentTitle];
};

export { useDocumentTitle };