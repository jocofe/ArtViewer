interface ParsedUserAgent {
    operatingSystem: string;
    browser: string;
}

export function parseUserAgent(userAgentString: string): ParsedUserAgent {
    const osMap: { [key: string]: string } = {
        "Windows NT 10.0": "Windows 10",
        "Windows NT 6.3": "Windows 8.1",
        "Windows NT 6.2": "Windows 8",
        "Windows NT 6.1": "Windows 7",
        "Windows NT 6.0": "Windows Vista",
        "Windows NT 5.1": "Windows XP",
        "Macintosh": "Mac OS X",
        "Android": "Android",
        "iOS": "iOS",
        // Añade más sistemas operativos según sea necesario
    };

    const browserMap: { [key: string]: string } = {
        "Chrome": "Chrome",
        "Firefox": "Firefox",
        "Safari": "Safari",
        "Edge": "Edge",
        "IE": "Internet Explorer",
        // Añade más navegadores según sea necesario
    };

    const parsedUserAgent: ParsedUserAgent = {
        operatingSystem: "Unknown",
        browser: "Unknown",
    };

    const osRegex = /(Windows NT [\d.]+|Macintosh|Android|iOS|Linux|PlayStation)/;
    const browserRegex = /(Chrome|Firefox|Safari|Edge|IE)/;

    const osMatch = userAgentString.match(osRegex);
    const browserMatch = userAgentString.match(browserRegex);

    if (osMatch && osMatch[0] && osMap[osMatch[0]]) {
        parsedUserAgent.operatingSystem = osMap[osMatch[0]];
    }

    if (browserMatch && browserMatch[0] && browserMap[browserMatch[0]]) {
        parsedUserAgent.browser = browserMap[browserMatch[0]];
    }

    return parsedUserAgent;
}