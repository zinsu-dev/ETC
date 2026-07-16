const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const stateHook = "  const [hospitalSearchQuery, setHospitalSearchQuery] = useState('');\n";
const newHook = "  const [toastMessage, setToastMessage] = useState(null);\n  const showToast = (msg, type = 'info') => {\n    setToastMessage({ msg, type });\n    setTimeout(() => setToastMessage(null), 3500);\n  };\n";
code = code.replace(stateHook, stateHook + newHook);

const appReturnEnd = "    </div>\n  );\n}";
const toastJsx = `
      {toastMessage && (
        <div className={\`premium-toast toast-\${toastMessage.type} animate-slide-up\`}>
          {toastMessage.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
          <span>{toastMessage.msg}</span>
        </div>
      )}
`;
code = code.replace(appReturnEnd, toastJsx + appReturnEnd);

// Replace alert with showToast
code = code.replace(/alert\((['\`].*?['\`])\)/g, "showToast($1, 'success')");

// Change See All in Labs Near You
code = code.replace(
  /onClick=\{\(\) => showToast\('Showing all near laboratories', 'success'\)\}/g,
  "onClick={() => setCurrentView('laboratories')}"
);

// Map MOCK_HOSPITALS for Labs Near You instead of LABS_NEAR_YOU
code = code.replace(
  /LABS_NEAR_YOU\.map/g,
  "MOCK_HOSPITALS.slice(0, 3).map"
);

fs.writeFileSync('src/App.jsx', code);
