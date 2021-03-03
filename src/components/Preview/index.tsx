import { useEffect, useRef } from "react";
import styles from "./Preview.module.scss";
interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              
              console.error(err);
            }
          }, false);
      </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }

    setTimeout(() => {
      if (iframe.current?.contentWindow) {
        iframe.current.contentWindow.postMessage(code, "*");
      }
    }, 75);
  }, [code]);

  return (
    <div className={styles["preview-wrapper"]}>
      <iframe
        className={styles.preview}
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
      />
    </div>
  );
};

export default Preview;
