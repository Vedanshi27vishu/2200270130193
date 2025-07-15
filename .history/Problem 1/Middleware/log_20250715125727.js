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

async function sendLog(stack, level, pkg, message) {
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
    return data;
}

const logInfo = async (pkg, message) => {
    await sendLog("backend", "info", pkg, message);
};

const logError = async (pkg, message) => {
    await sendLog("backend", "error", pkg, message);
};

module.exports = { logInfo, logError };
