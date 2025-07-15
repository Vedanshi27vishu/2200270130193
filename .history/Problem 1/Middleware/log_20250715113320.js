require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const PACKAGES = {
    backend: ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"],
    frontend: ["api", "component", "hook", "page", "state", "style"],
    common: ["auth", "config", "middleware", "utils"]
};

async function Log(stack, level, pkg, message) {
    stack = stack.toLowerCase();
    level = level.toLowerCase();
    pkg = pkg.toLowerCase();

    if (!STACKS.includes(stack)) {
        throw new Error(`Invalid stack: ${stack}. Allowed: ${STACKS.join(", ")}`);
    }

    if (!LEVELS.includes(level)) {
        throw new Error(`Invalid level: ${level}. Allowed: ${LEVELS.join(", ")}`);
    }

    const validPackages = [...PACKAGES.common, ...PACKAGES[stack]];
    if (!validPackages.includes(pkg)) {
        throw new Error(`Invalid package: ${pkg}. Allowed: ${validPackages.join(", ")}`);
    }

    const body = { stack, level, package: pkg, message };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to log: ${response.status} ${response.statusText} - ${text}`);
    }

    const data = await response.json();
    console.log("Log Success:", data);
    return data;
}

module.exports = Log;
