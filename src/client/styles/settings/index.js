const path = require('path');
const resources = [
    'colors.sass',
    'typography.sass',
    'spacing.sass',
    'layout.sass',
    'mixins.sass'
];
module.exports = resources.map(file => path.resolve(__dirname, file));
