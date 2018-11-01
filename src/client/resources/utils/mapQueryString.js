const mapQueryString = query =>
    Object.keys(query)
        .map(
            key =>
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(JSON.stringify(query[key]))
        )
        .join('&')
        .replace(/%20/g, '+');

export default mapQueryString;
