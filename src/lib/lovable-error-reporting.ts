// Lovable's cloud sandbox injects this module at build time to pipe runtime
// errors to its own dashboard. It is not exported with the project, so the
// build fails outside Lovable with "Could not resolve
// '../lib/lovable-error-reporting'". This is a local no-op replacement:
// it logs to the console instead of phoning home to Lovable's telemetry
// endpoint. Delete this file (and revert the import in __root.tsx) only if
// you redeploy through Lovable, where the real module is reinjected.
export function reportLovableError(error: unknown, context?: Record<string, unknown>): void {
  console.error("[unhandled render error]", error, context);
}
