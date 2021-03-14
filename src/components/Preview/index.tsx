import { useEffect, useRef } from "react";
import styles from "./Preview.module.scss";

type PreviewProps = {
  code: string;
  bundleErrorMessage: string;
};

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (error) => {
            const root = document.querySelector('#root');
            document.body.style.margin = '0';
            root.innerHTML = '<div style="margin: 12px;"><pre style="line-height: 1.4;white-space: pre-wrap; padding: 0; margin: 0; background: none; color: darkred; font-family: sans-serif; font-weight: bold; font-size: 20px;">' + error + '</pre></div>'
            
            console.error(error);
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (error) {
              handleError(error);
            }
          }, false);
      </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundleErrorMessage }) => {
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
      {!!bundleErrorMessage && (
        <div className={styles["preview-error-wrapper"]}>
          <pre className={styles["preview-error"]}>{bundleErrorMessage}</pre>
        </div>
      )}
    </div>
  );
};

export default Preview;
