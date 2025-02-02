// vite.config.ts
import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/@remix-run+dev@2.15.0_@remix-run+react@2.15.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_typ_3djlhh3t6jbfog2cydlrvgreoy/node_modules/@remix-run/dev/dist/index.js";
import UnoCSS from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/unocss@0.61.9_postcss@8.4.49_rollup@4.28.0_vite@5.4.11_@types+node@22.10.1_sass-embedded@1.81.0_/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1_sass-embedded@1.81.0/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_rollup@4.28.0_vite@5.4.11_@types+node@22.10.1_sass-embedded@1.81.0_/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { optimizeCssModules } from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/vite-plugin-optimize-css-modules@1.1.0_vite@5.4.11_@types+node@22.10.1_sass-embedded@1.81.0_/node_modules/vite-plugin-optimize-css-modules/dist/index.mjs";
import tsconfigPaths from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.2_vite@5.4.11_@types+node@22.10.1_sass-embedded@1.81.0_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import * as dotenv from "file:///D:/Documents/Github/my-boltdiy/node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js";
import { execSync } from "node:child_process";
dotenv.config();
var getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "no-git-info";
  }
};
var vite_config_default = defineConfig((config2) => {
  const plugins = [
    nodePolyfills({
      include: ["path", "buffer", "process"]
    }),
    remixVitePlugin({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    UnoCSS(),
    tsconfigPaths(),
    chrome129IssuePlugin()
  ];
  if (config2.mode !== "test") {
    plugins.unshift(remixCloudflareDevProxy());
  }
  if (config2.mode === "production") {
    plugins.push(optimizeCssModules({ apply: "build" }));
  }
  return {
    define: {
      __COMMIT_HASH: JSON.stringify(getGitHash()),
      __APP_VERSION: JSON.stringify(process.env.npm_package_version)
    },
    build: {
      target: process.env.VITE_MOBILE_SUPPORT ? "es2015" : "esnext",
      minify: true,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"]
          }
        }
      }
    },
    plugins,
    envPrefix: ["VITE_", "OPENAI_LIKE_API_BASE_URL", "OLLAMA_API_BASE_URL", "LMSTUDIO_API_BASE_URL", "TOGETHER_API_BASE_URL"],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  };
});
function chrome129IssuePlugin() {
  return {
    name: "chrome129IssuePlugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers["user-agent"]?.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (raw) {
          const version = Number.parseInt(raw[2], 10);
          if (version === 129) {
            res.setHeader("content-type", "text/html");
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>'
            );
            return;
          }
        }
        next();
      });
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEb2N1bWVudHNcXFxcR2l0aHViXFxcXG15LWJvbHRkaXlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERvY3VtZW50c1xcXFxHaXRodWJcXFxcbXktYm9sdGRpeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRG9jdW1lbnRzL0dpdGh1Yi9teS1ib2x0ZGl5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY2xvdWRmbGFyZURldlByb3h5Vml0ZVBsdWdpbiBhcyByZW1peENsb3VkZmxhcmVEZXZQcm94eSwgdml0ZVBsdWdpbiBhcyByZW1peFZpdGVQbHVnaW4gfSBmcm9tICdAcmVtaXgtcnVuL2Rldic7XHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVml0ZURldlNlcnZlciB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xyXG5pbXBvcnQgeyBvcHRpbWl6ZUNzc01vZHVsZXMgfSBmcm9tICd2aXRlLXBsdWdpbi1vcHRpbWl6ZS1jc3MtbW9kdWxlcyc7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xyXG5cclxuZG90ZW52LmNvbmZpZygpO1xyXG5cclxuLy8gR2V0IGdpdCBoYXNoIHdpdGggZmFsbGJhY2tcclxuY29uc3QgZ2V0R2l0SGFzaCA9ICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGV4ZWNTeW5jKCdnaXQgcmV2LXBhcnNlIC0tc2hvcnQgSEVBRCcpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuICduby1naXQtaW5mbyc7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChjb25maWcpID0+IHtcclxuICBjb25zdCBwbHVnaW5zID0gW1xyXG4gICAgbm9kZVBvbHlmaWxscyh7XHJcbiAgICAgIGluY2x1ZGU6IFsncGF0aCcsICdidWZmZXInLCAncHJvY2VzcyddLFxyXG4gICAgfSksXHJcbiAgICByZW1peFZpdGVQbHVnaW4oe1xyXG4gICAgICBmdXR1cmU6IHtcclxuICAgICAgICB2M19mZXRjaGVyUGVyc2lzdDogdHJ1ZSxcclxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcclxuICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxyXG4gICAgICAgIHYzX2xhenlSb3V0ZURpc2NvdmVyeTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBVbm9DU1MoKSxcclxuICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgIGNocm9tZTEyOUlzc3VlUGx1Z2luKCksXHJcbiAgXTtcclxuXHJcbiAgaWYgKGNvbmZpZy5tb2RlICE9PSAndGVzdCcpIHtcclxuICAgIHBsdWdpbnMudW5zaGlmdChyZW1peENsb3VkZmxhcmVEZXZQcm94eSgpKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcubW9kZSA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBwbHVnaW5zLnB1c2gob3B0aW1pemVDc3NNb2R1bGVzKHsgYXBwbHk6ICdidWlsZCcgfSkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0NPTU1JVF9IQVNIOiBKU09OLnN0cmluZ2lmeShnZXRHaXRIYXNoKCkpLFxyXG4gICAgICBfX0FQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LlZJVEVfTU9CSUxFX1NVUFBPUlQgPyAnZXMyMDE1JyA6ICdlc25leHQnLFxyXG4gICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgIGNzc01pbmlmeTogdHJ1ZSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuICAgICAgICAgICAgdWk6IFsnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudSddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGx1Z2lucyxcclxuICAgIGVudlByZWZpeDogW1wiVklURV9cIixcIk9QRU5BSV9MSUtFX0FQSV9CQVNFX1VSTFwiLCBcIk9MTEFNQV9BUElfQkFTRV9VUkxcIiwgXCJMTVNUVURJT19BUElfQkFTRV9VUkxcIixcIlRPR0VUSEVSX0FQSV9CQVNFX1VSTFwiXSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNocm9tZTEyOUlzc3VlUGx1Z2luKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnY2hyb21lMTI5SXNzdWVQbHVnaW4nLFxyXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcjogVml0ZURldlNlcnZlcikge1xyXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhdyA9IHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10/Lm1hdGNoKC9DaHJvbShlfGl1bSlcXC8oWzAtOV0rKVxcLi8pO1xyXG5cclxuICAgICAgICBpZiAocmF3KSB7XHJcbiAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gTnVtYmVyLnBhcnNlSW50KHJhd1syXSwgMTApO1xyXG5cclxuICAgICAgICAgIGlmICh2ZXJzaW9uID09PSAxMjkpIHtcclxuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignY29udGVudC10eXBlJywgJ3RleHQvaHRtbCcpO1xyXG4gICAgICAgICAgICByZXMuZW5kKFxyXG4gICAgICAgICAgICAgICc8Ym9keT48aDE+UGxlYXNlIHVzZSBDaHJvbWUgQ2FuYXJ5IGZvciB0ZXN0aW5nLjwvaDE+PHA+Q2hyb21lIDEyOSBoYXMgYW4gaXNzdWUgd2l0aCBKYXZhU2NyaXB0IG1vZHVsZXMgJiBWaXRlIGxvY2FsIGRldmVsb3BtZW50LCBzZWUgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zdGFja2JsaXR6L2JvbHQubmV3L2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMjM5NTUxOTI1OFwiPmZvciBtb3JlIGluZm9ybWF0aW9uLjwvYT48L3A+PHA+PGI+Tm90ZTo8L2I+IFRoaXMgb25seSBpbXBhY3RzIDx1PmxvY2FsIGRldmVsb3BtZW50PC91Pi4gYHBucG0gcnVuIGJ1aWxkYCBhbmQgYHBucG0gcnVuIHN0YXJ0YCB3aWxsIHdvcmsgZmluZSBpbiB0aGlzIGJyb3dzZXIuPC9wPjwvYm9keT4nLFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJc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
