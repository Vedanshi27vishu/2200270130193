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
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  pkg = pkg.toLowerCase();

  const validPackages = [...PACKAGES.common, ...PACKAGES[stack]];
  if (!STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
  if (!LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);
  if (!validPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

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
    const errorText = await response.text();
    throw new Error(`Failed to log: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

const logInfo = async (pkg, message) => {
  try {
    await sendLog("backend", "info", pkg, message);
  } catch (err) {
    console.error("LogInfo Error:", err.message);
  }
};

const logError = async (pkg, message) => {
  try {
    await sendLog("backend", "error", pkg, message);
  } catch (err) {
    console.error("LogError Error:", err.message);
  }
};

module.exports = { logInfo, logError };
