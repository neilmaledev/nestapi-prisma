// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from "@sentry/nestjs"

Sentry.init({
  dsn: "https://f8f47e442976f0594c28131066db5bee@o4511173176328192.ingest.us.sentry.io/4511173184716800",

  // Send structured logs to Sentry
  enableLogs: true,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});