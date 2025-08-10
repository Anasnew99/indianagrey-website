
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-jsx": preferDefault(require("/workspace/src/pages/index.jsx"))
}

