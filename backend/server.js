// Thin launcher to run the compiled TypeScript output.
import("./dist/server.js").catch((error) => {
  console.error("Failed to start backend. Did you run `npm run build`?", error);
  process.exit(1);
});
