/**
 * Connect Clinic — admin booking list endpoint.
 *
 * Reads from the BOOKINGS KV namespace and returns the most recent
 * intake submissions. Gated behind ADMIN_TOKEN so the URL is not
 * publicly enumerable.
 *
 * Auth: pass the token via either header or query string.
 *   GET /api/bookings?token=XXXX
 *   GET /api/bookings   with header  Authorization: Bearer XXXX
 *
 * Response shape:
 *   {
 *     ok: true,
 *     count: 12,
 *     bookings: [ { id, submittedAt, service, patient, safety, ... }, ... ]
 *   }
 *
 * Newest first. List capped at ?limit= (default 100, max 500).
 */

function unauthorized(reason) {
  return new Response(JSON.stringify({ ok: false, error: reason }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}

function getProvidedToken(request) {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("token");
  if (fromQuery) return fromQuery;
  const auth = request.headers.get("Authorization") || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim();
  return null;
}

export async function onRequestGet({ request, env }) {
  if (!env || !env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({
      ok: false,
      error: "admin_token_not_configured",
      hint: "Set ADMIN_TOKEN in Cloudflare Pages environment variables."
    }), { status: 503, headers: { "Content-Type": "application/json" } });
  }

  const provided = getProvidedToken(request);
  if (!provided) return unauthorized("missing_token");
  if (provided !== env.ADMIN_TOKEN) return unauthorized("bad_token");

  if (!env.BOOKINGS) {
    return new Response(JSON.stringify({
      ok: false,
      error: "kv_not_bound",
      hint: "Bind a KV namespace as BOOKINGS in the Pages project settings."
    }), { status: 503, headers: { "Content-Type": "application/json" } });
  }

  const url = new URL(request.url);
  let limit = parseInt(url.searchParams.get("limit") || "100", 10);
  if (!Number.isFinite(limit) || limit <= 0) limit = 100;
  if (limit > 500) limit = 500;

  const list = await env.BOOKINGS.list({ limit: 1000 });
  const keys = list.keys
    .map(k => k.name)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, limit);

  const bookings = await Promise.all(keys.map(async (key) => {
    try {
      const raw = await env.BOOKINGS.get(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return { id: key, error: "parse_failed", message: e && e.message };
    }
  }));

  return new Response(JSON.stringify({
    ok: true,
    count: bookings.filter(Boolean).length,
    truncated: list.list_complete === false,
    bookings: bookings.filter(Boolean)
  }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestDelete({ request, env }) {
  if (!env || !env.ADMIN_TOKEN) return unauthorized("admin_token_not_configured");
  const provided = getProvidedToken(request);
  if (!provided || provided !== env.ADMIN_TOKEN) return unauthorized("bad_token");
  if (!env.BOOKINGS) {
    return new Response(JSON.stringify({ ok: false, error: "kv_not_bound" }), {
      status: 503, headers: { "Content-Type": "application/json" }
    });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: "missing_id" }), {
      status: 400, headers: { "Content-Type": "application/json" }
    });
  }

  await env.BOOKINGS.delete(id);
  return new Response(JSON.stringify({ ok: true, deleted: id }), {
    status: 200, headers: { "Content-Type": "application/json" }
  });
}
