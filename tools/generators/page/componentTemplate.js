module.exports = name => {
    const uName = name.slice(0,1).toUpperCase() + name.slice(1);
    return `import React, { Component } from 'react';
import { subscribe } from 'react-contextual';
import './${uName}.sass';

const fetchData = params => ({ ${name}Fetch: '${name}' });

export { fetchData };

@subscribe()
class ${uName} extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>${uName} works !</p>
        );
    }
}

export default ${uName};
`;
};
