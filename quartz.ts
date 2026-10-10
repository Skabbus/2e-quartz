console.log(">>> quartz.ts laddad")
import { componentRegistry } from "./quartz/components/registry"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

componentRegistry.setOptionOverrides("explorer", {
  sortFn: (a: any, b: any) => {
    const g: any = globalThis
    if (!g.__explorerOrderL) {
      let src: any = null
      try {
        let bp = document.body.dataset.basepath || ""
        if (!bp && location.pathname.indexOf("/2e-quartz/") === 0) bp = "/2e-quartz"
        if (bp.length > 1 && bp.charAt(bp.length - 1) === "/") bp = bp.slice(0, -1)
        const x = new XMLHttpRequest()
        x.open("GET", bp + "/static/explorer-order.json", false)
        x.send()
        if (x.status === 200) src = JSON.parse(x.responseText)
      } catch (e) {
        src = null
      }
      if (src) {
        const low: any = {}
        for (const k of Object.keys(src)) {
          low[k.toLowerCase()] = src[k]
        }
        g.__explorerOrderL = low
      }
    }
    const pos = g.__explorerOrderL || {}
    const ks = [a, b].map((n: any) =>
      String(n.slug || (n.data && n.data.slug) || "")
        .toLowerCase()
        .replace(/\/index$/, "")
        .replace(/\/$/, ""),
    )
    const ka = ks[0]
    const kb = ks[1]
    const pa = pos[ka]
    const pb = pos[kb]
    if (pa !== undefined && pb !== undefined) return pa - pb
    if (pa !== undefined || pb !== undefined) {
      const root = ka.indexOf("/") === -1
      if (pa !== undefined) return root ? 1 : -1
      return root ? -1 : 1
    }
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
})

console.log(">>> overrides:", Object.keys(componentRegistry.getOptionOverrides("explorer") ?? {}))

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()